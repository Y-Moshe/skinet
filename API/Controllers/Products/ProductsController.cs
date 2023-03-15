using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/products")]
  public class ProductsController : ControllerBase
  {
    private IGenericRepository<Product> _productsRepo { get; set; }

    public ProductsController(IGenericRepository<Product> repo)
    {
      _productsRepo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts()
    {
      var products = await _productsRepo.ListAllAsync();
      return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
      var product = await _productsRepo.GetByIdAsync(id);
      return Ok(product);
    }
  }
}