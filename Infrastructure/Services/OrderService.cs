using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.Order;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
  public class OrderService : IOrderService
  {
    private readonly IBasketRepository _basketRepo;
    private readonly IUnitOfWork _unitOfWork;

    public OrderService(IBasketRepository basketRepo, IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
      _basketRepo = basketRepo;
    }

    public async Task<Order> CreateOrderAsync(string buyerEmail,
        int deliveryMethodId, string basketId, OrderedAddress address)
    {
      // Getting basket
      var basket = await _basketRepo.GetBasketAsync(basketId);

      // Getting products
      var products = await Task.WhenAll(basket.Items
        .Select(i => _unitOfWork.Repository<Product>().GetByIdAsync(i.Id)));

      // Converting / Mapping to List<OrderItem>
      var items = products
        .Select(p =>
        {
          var orderdProduct = new OrderedProduct(p.Id, p.Name, p.Description, p.PictureUrl);
          var quantity = basket.Items.Find(i => i.Id == p.Id).Quantity;
          return new OrderItem(orderdProduct, p.Price, quantity);
        }).ToList();

      // Getting the DeliveryMethod and calc the subtotal price
      var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
      var subtotal = items.Sum(i => i.Price * i.Quantity);

      // Saving to database
      var order = new Order(buyerEmail, address, deliveryMethod, items, subtotal);
      _unitOfWork.Repository<Order>().Add(order);

      var result = await _unitOfWork.Complete();
      if (result <= 0) return null;

      // Empty the basket / shopping cart
      await _basketRepo.UpdateBasketAsync(new CustomerBasket(basketId));

      return order;
    }

    public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
    {
      return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
    }

    public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
    {
      var spec = new PopulateOrderSpec(id, buyerEmail);
      return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
    }

    public async Task<IReadOnlyList<Order>> GetUserOrdersAsync(string buyerEmail)
    {
      var spec = new PopulateOrderSpec(buyerEmail);
      return await _unitOfWork.Repository<Order>().ListAllWithSpecAsync(spec);
    }
  }
}