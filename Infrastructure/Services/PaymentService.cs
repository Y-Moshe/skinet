using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Stripe;
using Product = Core.Entities.Product;

namespace Infrastructure.Services
{
  public class PaymentService : IPaymentService
  {
    private readonly IBasketRepository _basketRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IConfiguration _config;

    public PaymentService(IBasketRepository basketRepository, IUnitOfWork unitOfWork, IConfiguration config)
    {
      _config = config;
      _unitOfWork = unitOfWork;
      _basketRepository = basketRepository;
    }

    public async Task<CustomerBasket> SavePaymentIntent(string basketId)
    {
      StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];
      var basket = await _basketRepository.GetBasketAsync(basketId);
      var shippingPrice = 0m;

      // Overwrite delivery method price
      if (basket.DeliveryMethodId.HasValue)
      {
        var deliveryMethod = await _unitOfWork
            .Repository<DeliveryMethod>()
            .GetByIdAsync(basket.DeliveryMethodId.Value);

        shippingPrice = deliveryMethod.Price;
      }

      // Getting products
      var products = await Task.WhenAll(basket.Items
        .Select(i => _unitOfWork.Repository<Product>().GetByIdAsync(i.Id)));

      // Overwrite each item price
      basket.Items.Select(item =>
      {
        var product = products.SingleOrDefault(p => p.Id == item.Id);
        if (product != null) item.Price = product.Price;
        return item;
      });

      var service = new PaymentIntentService();
      PaymentIntent intent;

      if (string.IsNullOrEmpty(basket.PaymentIntentId))
      {
        var options = new PaymentIntentCreateOptions
        {
          Amount = (long)basket.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long)shippingPrice * 100,
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
        options.Amount = (long)basket.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long)shippingPrice * 100;

        intent = await service.UpdateAsync(basket.PaymentIntentId, options);
      }

      await _basketRepository.UpdateBasketAsync(basket);
      return basket;
    }
  }
}