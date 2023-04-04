using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.Order;
using Core.Interfaces;

namespace Infrastructure.Services
{
  public class OrderService : IOrderService
  {
    private readonly IGenericRepository<Order> _orderRepo;
    private readonly IGenericRepository<DeliveryMethod> _dmRepo;
    private readonly IGenericRepository<Product> _productRepo;
    private readonly IBasketRepository _basketRepo;

    public OrderService
    (
        IGenericRepository<Order> orderRepo,
        IGenericRepository<DeliveryMethod> dmRepo,
        IGenericRepository<Product> productRepo,
        IBasketRepository basketRepo
    )
    {
      _basketRepo = basketRepo;
      _productRepo = productRepo;
      _dmRepo = dmRepo;
      _orderRepo = orderRepo;
    }

    public async Task<Order> CreateOrderAsync(string buyerEmail,
        int deliveryMethodId, string basketId, OrderedAddress address)
    {
      // Getting basket
      var basket = await _basketRepo.GetBasketAsync(basketId);

      // Getting products
      var products = await Task.WhenAll(basket.Items
        .Select(i => _productRepo.GetByIdAsync(i.Id)));

      // Converting / Mapping to List<OrderItem>
      var items = products
        .Select(p => {
            var orderdProduct = new OrderedProduct(p.Id, p.Name, p.Description, p.PictureUrl);
            var quantity = basket.Items.Find(i => i.Id == p.Id).Quantity;
            return new OrderItem(orderdProduct, p.Price, quantity);
        }).ToList();

        // Getting the DeliveryMethod and calc the subtotal price
        var deliveryMethod = await _dmRepo.GetByIdAsync(deliveryMethodId);
        var subtotal = items.Sum(i => i.Price * i.Quantity);

        var order = new Order(buyerEmail, address, deliveryMethod, items, subtotal);
        // TODO: Save to database

        return order;
    }

    public Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
    {
      throw new NotImplementedException();
    }

    public Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
    {
      throw new NotImplementedException();
    }

    public Task<IReadOnlyList<Order>> GetUserOrdersAsync(string buyerEmail)
    {
      throw new NotImplementedException();
    }
  }
}