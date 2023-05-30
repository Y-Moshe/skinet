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

    public async Task<Order> CreateOrderAsync(string buyerEmail,
        int deliveryMethodId, string basketId, OrderedAddress address)
    {
        // Getting basket
        var basket = await _basketRepo.GetBasketAsync(basketId);

        // Getting products
        var products = await Task.WhenAll(basket.Items
          .Select(i => _unitOfWork.Repository<Product>().GetEntityByIdAsync(i.Id)));

        // Converting / Mapping to List<OrderItem>
        var items = products
          .Select(p =>
          {
              var orderdProduct = new OrderedProduct((int)p.Id, p.Name, p.Description, p.PictureUrl);
              var quantity = basket.Items.Find(i => i.Id == p.Id).Quantity;
              return new OrderItem(orderdProduct, p.Price, quantity);
          }).ToList();

        // Getting the DeliveryMethod and calc the subtotal price
        var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetEntityByIdAsync(deliveryMethodId);
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
              buyerEmail, address, deliveryMethod,
              items, subtotal, basket.PaymentIntentId);
            _unitOfWork.Repository<Order>().Add(order);

        }

        // Save to database
        var result = await _unitOfWork.SaveChangesAsync();
        if (result <= 0) return null;

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
