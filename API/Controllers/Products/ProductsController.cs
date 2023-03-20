using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
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
    public async Task<ActionResult<IReadOnlyList<ProductDto>>> GetProducts(
      string sortBy,
      int? brandId,
      int? typeId
    )
    {
      var spec = new ProductsWithTypeAndBrandSpecification(sortBy,brandId, typeId);
      var products = await _productsRepo.ListAllWithSpecAsync(spec);
      return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDto>>(products));
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