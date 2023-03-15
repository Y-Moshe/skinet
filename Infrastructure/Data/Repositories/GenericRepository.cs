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

    public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
    {
      return await ApplySpecification(spec).SingleOrDefaultAsync();
    }

    public async Task<IReadOnlyList<T>> ListAllWithSpecAsync(ISpecification<T> spec)
    {
      return await ApplySpecification(spec).ToListAsync();
    }

    private IQueryable<T> ApplySpecification(ISpecification<T> spec)
    {
      return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
    }
  }
}