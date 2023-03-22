using System.Security.Claims;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
  public static class UserManagerExtension
  {
    public static async Task<AppUser> FindUserByClaims
    (this UserManager<AppUser> userManager, ClaimsPrincipal user)
    {
      var email = user.FindFirstValue(ClaimTypes.Email);
      return await userManager.Users
        .Include(u => u.Address)
        .SingleOrDefaultAsync(u => u.Email == email);
    }
  }
}