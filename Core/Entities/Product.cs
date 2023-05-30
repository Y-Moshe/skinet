using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Product : BaseEntity
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    [Range(0.1, double.MaxValue, ErrorMessage = "Require a minimum of 0.1!")]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }
    [Required]
    [Url]
    public string PictureUrl { get; set; }

    [Required]
    public int BrandId { get; set; }
    public Brand Brand { get; set; }

    [Required]
    public int CategoryId { get; set; }
    public Category Category { get; set; }
}
