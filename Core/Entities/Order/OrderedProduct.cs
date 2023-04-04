using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Order
{
  public class OrderedProduct
  {
    public OrderedProduct() { }
    public OrderedProduct(
      int productId, string name,
      string description, string pictureUrl)
    {
      ProductId = productId;
      Name = name;
      Description = description;
      PictureUrl = pictureUrl;
    }

    [Required]
    public int ProductId { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public string PictureUrl { get; set; }
  }
}