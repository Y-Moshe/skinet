using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Order
{
  public class OrderItem : BaseEntity
  {
    public OrderItem() { }
    public OrderItem(OrderedProduct product, decimal price, int quantity)
    {
      Product = product;
      Price = price;
      Quantity = quantity;
    }

    [Required]
    public OrderedProduct Product { get; set; }
    [Required]
    public decimal Price { get; set; }
    [Required]
    public int Quantity { get; set; }
  }
}