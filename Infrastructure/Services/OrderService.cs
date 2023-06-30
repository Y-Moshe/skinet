using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services;

public class OrderService : IOrderService
{
    private readonly IBasketRepository _basketRepo;
    private readonly IUnitOfWork _unitOfWork;

    public OrderService(IBasketRepository basketRepo, IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
        _basketRepo = basketRepo;
    }

    public async Task<Order> CreateOrderAsync(
        string buyerEmail,
        int deliveryMethodId,
        string basketId,
        OrderedAddress address
    )
    {
        // Getting basket
        var basket = await _basketRepo.GetBasketAsync(basketId);

        // Getting products based on basket items
        List<OrderItem> items = new List<OrderItem>();
        foreach (var item in basket.Items)
        {
            var product = await _unitOfWork.Repository<Product>().GetEntityByIdAsync(item.Id);
            if (product != null)
                item.Price = product.Price;

            var orderdProduct = new OrderedProduct(
                product.Id,
                product.Name,
                product.Description,
                product.PictureUrl
            );
            var quantity = basket.Items.Find(i => i.Id == product.Id).Quantity;

            items.Add(new OrderItem(orderdProduct, product.Price, quantity));
        }

        // Getting the DeliveryMethod and calc the subtotal price
        var deliveryMethod = await _unitOfWork
            .Repository<DeliveryMethod>()
            .GetEntityByIdAsync(deliveryMethodId);
        var subtotal = items.Sum(i => i.Price * i.Quantity);

        var order = await this.GetOrderByPaymentIntentId(basket.PaymentIntentId);

        if (order != null)
        {
            // Update the order
            order.Address = address;
            order.DeliveryMethod = deliveryMethod;
            order.Subtotal = subtotal;

            _unitOfWork.Repository<Order>().Update(order);
        }
        else
        {
            // Create the order
            order = new Order(
                buyerEmail,
                address,
                deliveryMethod,
                items,
                subtotal,
                basket.PaymentIntentId
            );

            _unitOfWork.Repository<Order>().Add(order);
        }

        // Save to database
        var result = await _unitOfWork.SaveChangesAsync();
        if (result <= 0)
            return null;

        return order;
    }

    public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
    {
        return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
    }

    public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
    {
        var spec = new PopulateOrderSpec(id, buyerEmail);
        return await _unitOfWork.Repository<Order>().GetEntityWithSpecAsync(spec);
    }

    public async Task<Order> GetOrderByPaymentIntentId(string paymentIntentId)
    {
        var spec = new OrderByPaymentIntentIdSpec(paymentIntentId);
        return await _unitOfWork.Repository<Order>().GetEntityWithSpecAsync(spec);
    }

    public async Task<IReadOnlyList<Order>> GetUserOrdersAsync(string buyerEmail)
    {
        var spec = new PopulateOrderSpec(buyerEmail);
        return await _unitOfWork.Repository<Order>().ListAllWithSpecAsync(spec);
    }
}
