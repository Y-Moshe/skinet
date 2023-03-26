using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
  public class AppIdentityDbContextSeed
  {
    public static async Task SeedUserAsync(UserManager<AppUser> manager)
    {
      if (!manager.Users.Any())
      {
        var user = new AppUser
        {
          FullName = "Moshe",
          UserName = "Y-Moshe",
          Email = "moshe@gmail.com",
          Address = new Address
          {
            FirstName = "Moshe",
            LastName = "...",
            City = "Ashdod",
            State = "Israel",
            Street = "Mavo",
            ZipCode = "534634",
          },
        };

        await manager.CreateAsync(user, "Pa$$w0rd");
      }
    }
  }
}