using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.AppIdentity;

public class AppIdentityDbContextSeed
{
    public static async Task SeedUserAsync(UserManager<AppUser> manager)
    {
        if (!manager.Users.Any())
        {
            var user = new AppUser
            {
                FullName = "John Doe",
                UserName = "John_Doe",
                Email = "john.doe@gmail.com",
                Address = new Address
                {
                    FirstName = "John",
                    LastName = "Doe",
                    City = "Anytown",
                    State = "USA",
                    Street = "123 Main St",
                    ZipCode = "29147",
                },
            };

            await manager.CreateAsync(user, "Aa123456");
        }
    }
}
