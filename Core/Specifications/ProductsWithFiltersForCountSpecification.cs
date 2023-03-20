using Core.Entities;

namespace Core.Specifications
{
  public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
  {
    public ProductsWithFiltersForCountSpecification(ProductsParamsSpecification productsParams)
    : base(p => (
        (string.IsNullOrEmpty(productsParams.Search) || p.Name.ToLower().Contains(productsParams.Search)) &&
        (!productsParams.BrandId.HasValue || p.ProductBrandId == productsParams.BrandId) &&
        (!productsParams.TypeId.HasValue || p.ProductTypeId == productsParams.TypeId)
      ))
    {
    }
  }
}