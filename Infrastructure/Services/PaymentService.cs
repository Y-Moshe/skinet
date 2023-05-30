using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Product = Core.Entities.Product;
using Stripe;

namespace Infrastructure.Services;

public class PaymentService : IPaymentService
{
    private readonly IBasketRepository _basketRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IConfiguration _config;
    private readonly IOrderService _orderService;

    public PaymentService(
        IBasketRepository basketRepository,
        IUnitOfWork unitOfWork,
        IConfiguration config,
        IOrderService orderService)
    {
        _orderService = orderService;
        _config = config;
        _unitOfWork = unitOfWork;
        _basketRepository = basketRepository;
    }

    public async Task<CustomerBasket> SavePaymentIntent(string basketId)
    {
        StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];
        var basket = await _basketRepository.GetBasketAsync(basketId);
        if (basket == null) return null;

        var shippingPrice = 0m;

        // Overwrite delivery method price
        if (basket.DeliveryMethodId.HasValue)
        {
            var deliveryMethod = await _unitOfWork
                .Repository<DeliveryMethod>()
                .GetEntityByIdAsync(basket.DeliveryMethodId.Value);

            shippingPrice = deliveryMethod.Price;
        }

        // Getting products
        var products = await Task.WhenAll(basket.Items
            .Select(i => _unitOfWork.Repository<Product>()
            .GetEntityByIdAsync(i.Id)));

        // Overwrite each item price to the correct one
        basket.Items.Select(item =>
        {
            var product = products.SingleOrDefault(p => p.Id == item.Id);
            if (product != null) item.Price = product.Price;
            return item;
        });

        var service = new PaymentIntentService();
        PaymentIntent intent;
        var amountToCharge = (long)(basket.Items
            .Sum(i => (i.Quantity * i.Price * 100)) +
                (long)(shippingPrice * 100));

        if (string.IsNullOrEmpty(basket.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = amountToCharge,
                Currency = "USD",
                PaymentMethodTypes = new List<string>() { "card" }
            };

            intent = await service.CreateAsync(options);
            basket.PaymentIntentId = intent.Id;
            basket.ClientSecret = intent.ClientSecret;
        }
        else
        {
            var options = new PaymentIntentUpdateOptions();
            options.Amount = amountToCharge;

            intent = await service.UpdateAsync(basket.PaymentIntentId, options);
        }

        return await _basketRepository.UpdateBasketAsync(basket);
    }

    public async Task<Order> UpdateOrderStatus(
        string paymentIntentId,
        OrderStatus status)
    {
        var order = await _orderService
            .GetOrderByPaymentIntentId(paymentIntentId);
        order.Status = status;

        _unitOfWork.Repository<Order>().Update(order);
        await _unitOfWork.SaveChangesAsync();
        return order;
    }
}
