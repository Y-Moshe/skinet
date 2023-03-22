using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
  public class RegisterFieldsDto
  {
    [Required]
    public string DisplayName { get; set; }
    [Required]
    [RegularExpression("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$",
      ErrorMessage = "Invalid password, require at least one uppercase, lowercase, digits and minlength of 6!")]
    public string Password { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
  }
}