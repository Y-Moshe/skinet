using Core.Entities.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.AppDb.Config
{
  public class DeliveryMethodConfig : IEntityTypeConfiguration<DeliveryMethod>
  {
    public void Configure(EntityTypeBuilder<DeliveryMethod> builder)
    {
      builder
        .Property(dm => dm.Price)
        .HasColumnType("decimal(18,2)");
    }
  }
}