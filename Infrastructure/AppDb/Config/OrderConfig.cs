using Core.Entities.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.AppDb.Config
{
  public class OrderConfig : IEntityTypeConfiguration<Order>
  {
    public void Configure(EntityTypeBuilder<Order> builder)
    {
      builder.OwnsOne(
        o => o.Address,
        a =>
        {
          a.WithOwner();
        }
      );

      builder
        .Property(o => o.Status)
        .HasConversion(
            s => s.ToString(),
            s => (OrderStatus)Enum.Parse(typeof(OrderStatus), s)
        );

      builder
        .HasMany(o => o.Items)
        .WithOne()
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}