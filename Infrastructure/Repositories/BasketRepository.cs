using System.Text.Json;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data.Repositories
{
  public class BasketRepository : IBasketRepository
  {
    private readonly IDatabase _database;
    public BasketRepository(IConnectionMultiplexer redis)
    {
      _database = redis.GetDatabase();
    }

    public async Task<bool> DeleteBasketAsync(string bucketId)
    {
      return await _database.KeyDeleteAsync(bucketId);
    }

    public async Task<CustomerBasket> GetBasketAsync(string basketId)
    {
      var data = await _database.StringGetAsync(basketId);
      return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
    }

    public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
    {
      var dataToSet = JsonSerializer.Serialize(basket);
      var isCreated = await _database.StringSetAsync(basket.Id, dataToSet, TimeSpan.FromDays(30));

      if (!isCreated) return null;
      return await GetBasketAsync(basket.Id);
    }
  }
}