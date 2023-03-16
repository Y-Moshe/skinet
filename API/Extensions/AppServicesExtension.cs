using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
  public static class AppServicesExtension
  {
    public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration config)
    {
      // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
      services.AddEndpointsApiExplorer();
      services.AddSwaggerGen();
      services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
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

      services.AddDbContext<StoreContext>(opt =>
      {
        opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
      });

      return services;
    }
  }
}