using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Brand> Brands { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);
      builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

      if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
      {
        foreach (var entityType in builder.Model.GetEntityTypes())
        {
          var properties = entityType.ClrType
            .GetProperties()
            .Where(p => p.PropertyType == typeof(decimal));

          foreach (var property in properties)
          {
            builder
              .Entity(entityType.Name)
              .Property(property.Name)
              .HasConversion<double>();
          }
        }
      }
    }
  }
}