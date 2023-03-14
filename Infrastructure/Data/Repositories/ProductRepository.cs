using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories
{
  public class ProductRepository : IProductRepository
  {
    private StoreContext _context { get; set; }
    public ProductRepository(StoreContext context)
    {
      _context = context;
    }

    public async Task<Product> GetProductByIdAsync(int id)
    {
      var product = await _context.Products
        .Include(p => p.ProductBrand)
        .Include(p => p.ProductType)
        .SingleOrDefaultAsync(p => p.Id == id);

      return product;
    }

    public async Task<IReadOnlyList<Product>> GetProductsAsync()
    {
      var products = await _context.Products
        .Include(p => p.ProductBrand)
        .Include(p => p.ProductType)
        .ToListAsync();

      return products;
    }
  }
}