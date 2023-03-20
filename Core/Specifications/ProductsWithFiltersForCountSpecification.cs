using Core.Entities;

namespace Core.Specifications
{
  public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
  {
    public ProductsWithFiltersForCountSpecification(ProductsParamsSpecification productsParams)
    : base(p => (
        (!productsParams.BrandId.HasValue || p.ProductBrandId == productsParams.BrandId) &&
        (!productsParams.TypeId.HasValue || p.ProductTypeId == productsParams.TypeId)
      ))
    {
    }
  }
}