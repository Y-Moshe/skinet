using System.Reflection;
using System.Text.Json;
using Core.Entities;
using Core.Entities.Order;

namespace Infrastructure.Data
{
  public class AppDbContextSeed
  {
    public static async Task SeedAsync(AppDbContext context)
    {
      var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

      if (!context.Brands.Any())
      {
        var brandsData = File.ReadAllText(path + @"/AppDb/SeedData/brands.json");
        var brands = JsonSerializer.Deserialize<List<Brand>>(brandsData);
        context.Brands.AddRange(brands);
      }

      if (!context.Categories.Any())
      {
        var categoriesData = File.ReadAllText(path + @"/AppDb/SeedData/categories.json");
        var categories = JsonSerializer.Deserialize<List<Category>>(categoriesData);
        context.Categories.AddRange(categories);
      }

      if (!context.Products.Any())
      {
        var productsData = File.ReadAllText(path + @"/AppDb/SeedData/products.json");
        var products = JsonSerializer.Deserialize<List<Product>>(productsData);
        context.Products.AddRange(products);
      }

      if (!context.DeliveryMethods.Any())
      {
        var deliveriesData = File.ReadAllText(path + @"/AppDb/SeedData/delivery.json");
        var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveriesData);
        context.DeliveryMethods.AddRange(methods);
      }

      if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
    }
  }
}