using Core.Entities.Order;

namespace API.Dtos
{
  public class OrderDto
  {
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public string BuyerEmail { get; set; }
    public OrderedAddress Address { get; set; }
    public DeliveryMethod DeliveryMethod { get; set; }
    public IReadOnlyList<OrderItemDto> Items { get; set; }
    public string Status { get; set; }
    public decimal Subtotal { get; set; }
    public decimal Total { get; set; }
  }
}