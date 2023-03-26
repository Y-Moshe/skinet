using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
  public class Product : BaseEntity
  {
    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    [Range(0.1, double.MaxValue, ErrorMessage = "Require a minimum of 0.1!")]
    public decimal Price { get; set; }
    [Required]
    [Url]
    public string PictureUrl { get; set; }

    [Required]
    public int CategoryId { get; set; }
    public Category Category { get; set; }

    [Required]
    public int BrandId { get; set; }
    public Brand Brand { get; set; }
  }
}