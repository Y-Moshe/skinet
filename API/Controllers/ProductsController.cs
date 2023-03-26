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
    public async Task<ActionResult<Pagination<ProductDto>>> GetProducts([FromQuery] ProductsParamsSpecification queryParams)
    {
      var spec = new ProductsWithTypeAndBrandSpecification(queryParams);
      var countSpec = new ProductsWithFiltersForCountSpecification(queryParams);

      var products = await _productsRepo.ListAllWithSpecAsync(spec);
      var count = await _productsRepo.CountAsync(countSpec);

      var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDto>>(products);

      return Ok(new Pagination<ProductDto>(queryParams.PageIndex, queryParams.PageSize, count, data));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
      var spec = new ProductsWithTypeAndBrandSpecification(id);
      var product = await _productsRepo.GetEntityWithSpec(spec);
      return Ok(_mapper.Map<Product, ProductDto>(product));
    }
  }
}