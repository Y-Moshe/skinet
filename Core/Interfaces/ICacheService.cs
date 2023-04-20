namespace Core.Interfaces
{
  public interface ICacheService
  {
    Task SaveToCacheAsync(string key, object value, TimeSpan timeToLive);
    Task<string> GetFromCacheAsync(string key);
  }
}