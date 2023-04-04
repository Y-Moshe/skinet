using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Order
{
  public class DeliveryMethod : BaseEntity
  {
    [Required]
    public string ShortName { get; set; }
    [Required]
    public string DeliveryTime { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public decimal Price { get; set; }
  }
}