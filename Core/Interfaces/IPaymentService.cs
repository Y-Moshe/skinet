using Core.Entities;

namespace Core.Interfaces
{
  public interface IPaymentService
  {
    Task<CustomerBasket> SavePaymentIntent(string basketId);
  }
}