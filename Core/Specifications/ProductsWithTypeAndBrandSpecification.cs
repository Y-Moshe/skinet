using Core.Entities;

namespace Core.Specifications
{
  public class ProductsWithTypeAndBrandSpecification : BaseSpecification<Product>
  {
    public ProductsWithTypeAndBrandSpecification
      (string sortBy, int? brandId, int? typeId) : base(p => (
        (!brandId.HasValue || p.ProductBrandId == brandId) &&
        (!typeId.HasValue || p.ProductTypeId == typeId)
      ))
    {
      this.AddBrandAndTypeIncludes();

      if (!string.IsNullOrEmpty(sortBy))
      {
        switch (sortBy)
        {
          case "priceAsc":
            AddOrderBy(p => p.Price);
            break;
          case "priceDesc":
            AddOrderByDesceding(p => p.Price);
            break;
          default:
            AddOrderBy(p => p.Name);
            break;
        }
      }
    }

    public ProductsWithTypeAndBrandSpecification(int id) : base(p => p.Id == id)
    {
      this.AddBrandAndTypeIncludes();
    }

    private void AddBrandAndTypeIncludes()
    {
      AddInclude(p => p.ProductType);
      AddInclude(p => p.ProductBrand);
    }
  }
}