using Core.Entities;
using Core.Entities.Order;

namespace Core.Interfaces;

public interface IOrderService
{
    Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId,
        string basketId, OrderedAddress shippingAddress);
    Task<IReadOnlyList<Order>> GetUserOrdersAsync(string buyerEmail);
    Task<Order> GetOrderByIdAsync(int id, string buyerEmail);
    Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
    Task<Order> GetOrderByPaymentIntentId(string paymentIntentId);
}
