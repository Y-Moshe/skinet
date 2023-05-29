using Core.Entities;
using Core.Entities.Order;

namespace Core.Interfaces;

public interface IPaymentService
{
    Task<CustomerBasket> SavePaymentIntent(string basketId);
    Task<Order> UpdateOrderStatus(string paymentIntentId, OrderStatus status);
}
