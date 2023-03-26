using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
  public class AppUser : IdentityUser
  {
    [Required]
    public string FullName { get; set; }
    public Address Address { get; set; }
  }
}