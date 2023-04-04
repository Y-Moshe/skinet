using Core.Entities.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.AppDb.Config
{
  public class OrderItemConfig : IEntityTypeConfiguration<OrderItem>
  {
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
      builder.OwnsOne(
        i => i.Product,
        p =>
        {
          p.WithOwner();
        }
      );
      builder.Property(i => i.Price).HasColumnType("decimal(18,2)");
    }
  }
}