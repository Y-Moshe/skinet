using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductsController : ControllerBase
  {
    [HttpGet]
    public string getProducts()
    {
      return "getting products";
    }

    [HttpGet("{id}")]
    public string getProduct(int id)
    {
      return "getting a single product";
    }
  }
}