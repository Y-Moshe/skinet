using API.Dtos;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Route("api/products")]
  public class ProductsController : BaseApiController
  {
    private IGenericRepository<Product> _productsRepo { get; set; }
    private readonly IMapper _mapper;

    public ProductsController(IGenericRepository<Product> repo, IMapper mapper)
    {
      _mapper = mapper;
      _productsRepo = repo;
    }

    [HttpGet]
    [UseCache(120)]
    public async Task<ActionResult<Pagination<ProductDto>>> GetProducts([FromQuery] ProductsQueryParamsSpec queryParams)
    {
      int[] brandIds = new int[0];
      if (!string.IsNullOrEmpty(queryParams.BrandIds))
      {
        brandIds = queryParams.BrandIds.Split(',')
          .Select(n => int.Parse(n))
          .Where(n => n != 0)
          .ToArray();
      }

      var spec = new PopulateProductsSpec(queryParams, brandIds);
      var countSpec = new PopulateProductsCountSpec(queryParams, brandIds);

      var products = await _productsRepo.ListAllWithSpecAsync(spec);
      var count = await _productsRepo.CountAsync(countSpec);

      var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDto>>(products);

      return Ok(new Pagination<ProductDto>(queryParams.PageIndex, queryParams.PageSize, count, data));
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> CreateProduct(Product product)
    {
      var newProduct = new Product()
      {
        Name = product.Name,
        Description = product.Description,
        Price = product.Price,
        PictureUrl = product.PictureUrl,
        BrandId = product.BrandId,
        CategoryId = product.CategoryId
      };

      _productsRepo.Add(newProduct);
      await _productsRepo.SaveChangesAsync();
      return Ok(_mapper.Map<Product, ProductDto>(newProduct));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ProductDto>> UpdateProduct(int id, [FromBody] Product product)
    {
      _productsRepo.Update(product);
      await _productsRepo.SaveChangesAsync();
      return Ok(_mapper.Map<Product, ProductDto>(product));
    }

    [HttpGet("{id}")]
    [UseCache(120)]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
      var spec = new PopulateProductsSpec(id);
      var product = await _productsRepo.GetEntityWithSpec(spec);

      if (product == null) return NotFound();
      return Ok(_mapper.Map<Product, ProductDto>(product));
    }
  }
}