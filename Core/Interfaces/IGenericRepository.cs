using Core.Entities;

namespace Core.Interfaces
{
  public interface IGenericRepository<T> where T : BaseEntity
  {
    Task<T> GetEntityWithSpec(ISpecification<T> spec);
    Task<IReadOnlyList<T>> ListAllWithSpecAsync(ISpecification<T> spec);
  }
}