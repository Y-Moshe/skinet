using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class ProductConfig : IEntityTypeConfiguration<Product>
  {
    public void Configure(EntityTypeBuilder<Product> builder)
    {
      builder.Property(p => p.Id).IsRequired();
      builder.Property(p => p.Name).IsRequired();
      builder.Property(p => p.Description).IsRequired();
      builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
      builder.Property(p => p.PictureUrl).IsRequired();
      builder
        .HasOne(p => p.Brand)
        .WithMany()
        .HasForeignKey(p => p.BrandId);
      builder
        .HasOne(p => p.Category)
        .WithMany()
        .HasForeignKey(p => p.CategoryId);
    }
  }
}