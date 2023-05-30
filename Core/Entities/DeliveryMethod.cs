using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class DeliveryMethod : BaseEntity
{
    [Required]
    public string ShortName { get; set; }
    [Required]
    public string DeliveryTime { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }
}
