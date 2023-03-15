using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/products/brands")]
  public class ProductBrandsController : ControllerBase
  {
    private readonly IGenericRepository<ProductBrand> _brandsRepo;

    public ProductBrandsController(IGenericRepository<ProductBrand> repo)
    {
      _brandsRepo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetProductBrands()
    {
      var brands = await _brandsRepo.ListAllAsync();
      return Ok(brands);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProductBrand(int id)
    {
      var brand = await _brandsRepo.GetByIdAsync(id);
      return Ok(brand);
    }
  }
}