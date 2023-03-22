using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
  public class BasketItem
  {
    [Required]
    public int Id { get; set; }
    [Required]
    public string ProductName { get; set; }
    [Required]
    [Range(0.1, double.MaxValue, ErrorMessage = "Require a minimum of 0.1!")]
    public decimal Price { get; set; }
    [Required]
    [Url]
    public string PictureUrl { get; set; }
    [Required]
    public string Brand { get; set; }
    [Required]
    public string Type { get; set; }
    [Required]
    [MinLength(1, ErrorMessage = "Require at least 1")]
    public int Quantity { get; set; }
  }
}