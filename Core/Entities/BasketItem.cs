using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
  public class BasketItem
  {
    [Required]
    public int Id { get; set; }
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
    public Brand Brand { get; set; }
    [Required]
    public Category Category { get; set; }
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Require at least 1")]
    public int Quantity { get; set; }
  }
}