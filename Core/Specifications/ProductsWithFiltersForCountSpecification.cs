using Core.Entities;

namespace Core.Specifications
{
  public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
  {
    public ProductsWithFiltersForCountSpecification(ProductsParamsSpecification productsParams, int[] brandIds)
    : base(p => (
        (string.IsNullOrEmpty(productsParams.Search) || p.Name.ToLower().Contains(productsParams.Search)) &&
        (!productsParams.CategoryId.HasValue || p.CategoryId == productsParams.CategoryId) &&
        (brandIds.Length == 0 || brandIds.Contains(p.BrandId)
      )))
    {
    }
  }
}