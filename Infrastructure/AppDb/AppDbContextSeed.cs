using System.Text.Json;
using Core.Entities;

namespace Infrastructure.Data
{
  public class AppDbContextSeed
  {
    public static async Task SeedAsync(AppDbContext context)
    {
      if (!context.Brands.Any())
      {
        var brandsData = File.ReadAllText("../Infrastructure/AppDb/SeedData/brands.json");
        var brands = JsonSerializer.Deserialize<List<Brand>>(brandsData);
        context.Brands.AddRange(brands);
      }

      if (!context.Categories.Any())
      {
        var categoriesData = File.ReadAllText("../Infrastructure/AppDb/SeedData/categories.json");
        var categories = JsonSerializer.Deserialize<List<Category>>(categoriesData);
        context.Categories.AddRange(categories);
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