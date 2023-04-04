using Core.Entities;

namespace Core.Specifications
{
  public class PopulateProductsSpec : BaseSpecification<Product>
  {
    public PopulateProductsSpec
      (ProductsQueryParamsSpec queryParams, int[] brandIds) : base(p => (
        (string.IsNullOrEmpty(queryParams.Search) || p.Name.ToLower().Contains(queryParams.Search)) &&
        (!queryParams.CategoryId.HasValue || p.CategoryId == queryParams.CategoryId) &&
        (brandIds.Length == 0 || brandIds.Contains(p.BrandId)
      )))
    {
      this.AddBrandAndTypeIncludes();
      ApplyPaging(queryParams.PageSize * (queryParams.PageIndex - 1), queryParams.PageSize);

      if (!string.IsNullOrEmpty(queryParams.Sort))
      {
        switch (queryParams.Sort)
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

    public PopulateProductsSpec(int id) : base(p => p.Id == id)
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