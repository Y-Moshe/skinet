using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/products/types")]
  public class ProductTypesController : ControllerBase
  {
    private readonly IGenericRepository<ProductType> _typesRepo;

    public ProductTypesController(IGenericRepository<ProductType> repo)
    {
      _typesRepo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetProductTypes()
    {
      var brands = await _typesRepo.ListAllAsync();
      return Ok(brands);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProductType(int id)
    {
      var brand = await _typesRepo.GetByIdAsync(id);
      return Ok(brand);
    }
  }
}