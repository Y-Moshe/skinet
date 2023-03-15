using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories
{
  public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
  {
    private StoreContext _context { get; set; }
    public GenericRepository(StoreContext context)
    {
      _context = context;
    }

    public async Task<IReadOnlyList<T>> ListAllAsync()
    {
      return await _context.Set<T>().ToListAsync();
    }

    public async Task<T> GetByIdAsync(int id)
    {
      return await _context.Set<T>().FindAsync(id);
    }
  }
}