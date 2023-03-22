using System.Text.Json;
using Core.Entities;

namespace Infrastructure.Data
{
  public class AppDbContextSeed
  {
    public static async Task SeedAsync(AppDbContext context)
    {
      if (!context.ProductBrands.Any())
      {
        var brandsData = File.ReadAllText("../Infrastructure/AppDb/SeedData/brands.json");
        var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
        context.ProductBrands.AddRange(brands);
      }

      if (!context.ProductTypes.Any())
      {
        var typesData = File.ReadAllText("../Infrastructure/AppDb/SeedData/types.json");
        var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
        context.ProductTypes.AddRange(types);
      }

      if (!context.Products.Any())
      {
        var productsData = File.ReadAllText("../Infrastructure/AppDb/SeedData/products.json");
        var products = JsonSerializer.Deserialize<List<Product>>(productsData);
        context.Products.AddRange(products);
      }

      if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
    }
  }
}