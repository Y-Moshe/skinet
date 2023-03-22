using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

namespace API.Extensions
{
  public static class AppServicesExtension
  {
    public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
      services.AddScoped<ITokenService, TokenService>();
      services.AddScoped<IBasketRepository, BasketRepository>();
      services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

      services.Configure<ApiBehaviorOptions>(config =>
      {
        config.InvalidModelStateResponseFactory = actionContext =>
        {
          var errors = actionContext.ModelState
            .Where(e => e.Value.Errors.Count > 0)
            .SelectMany(x => x.Value.Errors)
            .Select(x => x.ErrorMessage)
            .ToArray();

          var errorResponse = new ApiValidationErrorResponse
          {
            Errors = errors
          };

          return new BadRequestObjectResult(errorResponse);
        };
      });

      services.AddSingleton<IConnectionMultiplexer>(_ =>
      {
        var options = ConfigurationOptions.Parse(config.GetConnectionString("RedisConnection"));
        return ConnectionMultiplexer.Connect(options);
      });

      services.AddDbContext<StoreContext>(opt =>
      {
        opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
      });

      services.AddCors(options =>
      {
        options.AddPolicy("CorsPolicy", policy =>
        {
          policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins("https://localhost:4200");
        });
      });

      return services;
    }
  }
}