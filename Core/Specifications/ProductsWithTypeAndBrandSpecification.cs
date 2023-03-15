using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
  public class ProductsWithTypeAndBrandSpecification : BaseSpecification<Product>
  {
    public ProductsWithTypeAndBrandSpecification()
    {
      this.AddBrandAndTypeIncludes();
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