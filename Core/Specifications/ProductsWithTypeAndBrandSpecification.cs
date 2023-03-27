using Core.Entities;

namespace Core.Specifications
{
  public class ProductsWithTypeAndBrandSpecification : BaseSpecification<Product>
  {
    public ProductsWithTypeAndBrandSpecification
      (ProductsParamsSpecification productsParams, int[] brandIds) : base(p => (
        (string.IsNullOrEmpty(productsParams.Search) || p.Name.ToLower().Contains(productsParams.Search)) &&
        (!productsParams.CategoryId.HasValue || p.CategoryId == productsParams.CategoryId) &&
        (brandIds.Length == 0 || brandIds.Contains(p.BrandId)
      )))
    {
      this.AddBrandAndTypeIncludes();
      ApplyPaging(productsParams.PageSize * (productsParams.PageIndex - 1), productsParams.PageSize);

      if (!string.IsNullOrEmpty(productsParams.Sort))
      {
        switch (productsParams.Sort)
        {
          case "a-z":
            AddOrderBy(p => p.Name);
            break;
          case "z-a":
            AddOrderByDesceding(p => p.Name);
            break;
          case "low-high":
            AddOrderBy(p => p.Price);
            break;
          case "high-low":
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
      AddInclude(p => p.Category);
      AddInclude(p => p.Brand);
    }
  }
}