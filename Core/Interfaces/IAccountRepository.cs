using System.Security.Claims;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Core.Interfaces
{
  public interface IAccountRepository
  {
    Task<AppUser> GetUserByEmailAsync(string email);
    Task<AppUser> GetUserByClaims(ClaimsPrincipal userClaims);
    Task<AppUser> LoginAsync(string email, string password);
    Task<AppUser> RegisterAsync(dynamic userFields);
    Task<IdentityResult> UpdateUserAsync(dynamic user);
    string GenerateToken(AppUser user);
  }
}