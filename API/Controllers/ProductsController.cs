using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductsController : ControllerBase
  {
    private IProductRepository productsRepository { get; set; }
    public ProductsController(IProductRepository productRepository)
    {
      this.productsRepository = productRepository;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> getProducts()
    {
      var products = await this.productsRepository.GetProductsAsync();
      return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> getProduct(int id)
    {
      var product = await this.productsRepository.GetProductByIdAsync(id);
      return Ok(product);
    }
  }
}