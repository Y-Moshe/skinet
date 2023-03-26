using Core.Entities;

namespace Core.Specifications
{
  public class ProductsWithTypeAndBrandSpecification : BaseSpecification<Product>
  {
    public ProductsWithTypeAndBrandSpecification
      (ProductsParamsSpecification productsParams) : base(p => (
        (string.IsNullOrEmpty(productsParams.Search) || p.Name.ToLower().Contains(productsParams.Search)) &&
        (!productsParams.BrandId.HasValue || p.BrandId == productsParams.BrandId) &&
        (!productsParams.CategoryId.HasValue || p.CategoryId == productsParams.CategoryId)
      ))
    {
      this.AddBrandAndTypeIncludes();
      ApplyPaging(productsParams.PageSize * (productsParams.PageIndex - 1), productsParams.PageSize);

      if (!string.IsNullOrEmpty(productsParams.SortBy))
      {
        switch (productsParams.SortBy)
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
      AddInclude(p => p.Category);
      AddInclude(p => p.Brand);
    }
  }
}