using Core.Entities;

namespace Core.Interfaces
{
  public interface IGenericRepository<T> where T : BaseEntity
  {
    Task<IReadOnlyList<T>> ListAllAsync();
    Task<T> GetByIdAsync(int id);
  }
}