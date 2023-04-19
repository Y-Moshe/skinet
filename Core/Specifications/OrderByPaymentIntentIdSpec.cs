using Core.Entities.Order;

namespace Core.Specifications
{
  public class OrderByPaymentIntentIdSpec : BaseSpecification<Order>
  {
    public OrderByPaymentIntentIdSpec(string paymentIntentId)
        : base(o => o.PaymentIntentId == paymentIntentId) { }
  }
}