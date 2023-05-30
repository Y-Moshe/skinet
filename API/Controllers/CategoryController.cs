using API.Helpers;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/categories")]
public class CategoryController : BaseApiController
{
    private readonly IGenericRepository<Category> _categoryRepo;

    public CategoryController(IGenericRepository<Category> repo)
    {
        _categoryRepo = repo;
    }

    [HttpGet]
    [UseCache(120)]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetCategories()
    {
        var categories = await _categoryRepo.ListAllAsync();
        return Ok(categories);
    }

    [HttpGet("{id}")]
    [UseCache(120)]
    public async Task<ActionResult<Product>> GetCategory(int id)
    {
        var category = await _categoryRepo.GetEntityByIdAsync(id);
        return Ok(category);
    }
}
