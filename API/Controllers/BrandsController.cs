using API.Helpers;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/brands")]
public class BrandsController : BaseApiController
{
    private readonly IGenericRepository<Brand> _brandsRepo;

    public BrandsController(IGenericRepository<Brand> repo)
    {
        _brandsRepo = repo;
    }

    [HttpGet]
    [UseCache(120)]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetBrands()
    {
        var brands = await _brandsRepo.ListAllAsync();
        return Ok(brands);
    }

    [HttpGet("{id}")]
    [UseCache(120)]
    public async Task<ActionResult<Product>> GetBrand(int id)
    {
        var brand = await _brandsRepo.GetEntityByIdAsync(id);
        return Ok(brand);
    }
}
