using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Order;

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
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }
    [Required]
    public int Quantity { get; set; }
}
