using Core.Entities;

namespace Core.Specifications;

public class PopulateProductsCountSpec : BaseSpecification<Product>
{
    public PopulateProductsCountSpec(ProductsQueryParamsSpec queryParams, int[] brandIds)
    : base(p => (
        (string.IsNullOrEmpty(queryParams.Search) || p.Name.ToLower().Contains(queryParams.Search)) &&
        (!queryParams.CategoryId.HasValue || p.CategoryId == queryParams.CategoryId) &&
        (brandIds.Length == 0 || brandIds.Contains(p.BrandId)
      )))
    {
    }
}
