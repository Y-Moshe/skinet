using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
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
      var spec = new ProductsWithTypeAndBrandSpecification();
      var products = await _productsRepo.ListAllWithSpecAsync(spec);
      return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
      var spec = new ProductsWithTypeAndBrandSpecification(id);
      var product = await _productsRepo.GetEntityWithSpec(spec);
      return Ok(product);
    }
  }
}