using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Order
{
  public class OrderedAddress
  {
    public OrderedAddress() { }
    public OrderedAddress(
      string firstName, string lastName, string street,
      string city, string state, string zipCode)
    {
      FirstName = firstName;
      LastName = lastName;
      Street = street;
      City = city;
      State = state;
      ZipCode = zipCode;
    }

    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Street { get; set; }
    [Required]
    public string City { get; set; }
    [Required]
    public string State { get; set; }
    [Required]
    public string ZipCode { get; set; }
  }
}