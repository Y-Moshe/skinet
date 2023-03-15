using System.Linq.Expressions;
using Core.Interfaces;

namespace Core.Specifications
{
  public class BaseSpecification<T> : ISpecification<T>
  {
    public Expression<Func<T, bool>> Criteria { get; }
    public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();

    public BaseSpecification(Expression<Func<T, bool>> criteria)
    {
      Criteria = criteria;
    }

    protected void AddInclude(Expression<Func<T, object>> expression)
    {
      Includes.Add(expression);
    }
  }
}