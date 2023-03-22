using System.Text;
using Core.Entities.Identity;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
  public static class IdentityServicesExtension
  {
    public static void AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddDbContext<AppIdentityDbContext>(options =>
      {
        options.UseSqlite(config.GetConnectionString("IdentityConnection"));
      });

      services.AddIdentityCore<AppUser>(options =>
      {
        // Add identity options
        options.Lockout.AllowedForNewUsers = true;
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromSeconds(30);
        options.Lockout.MaxFailedAccessAttempts = 3;
      })
      .AddEntityFrameworkStores<AppIdentityDbContext>()
      .AddSignInManager<SignInManager<AppUser>>();

      services
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
          options.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"])),
            ValidateIssuer = true,
            ValidIssuer = config["Token:Issuer"],
            ValidateAudience = false
          };
        });

      services.AddAuthorization();
    }
  }
}