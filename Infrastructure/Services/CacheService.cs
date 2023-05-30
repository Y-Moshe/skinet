using System.Text.Json;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Services;

public class CacheService : ICacheService
{
    private readonly IDatabase _database;

    public CacheService(IConnectionMultiplexer multiplexer)
    {
        _database = multiplexer.GetDatabase();
    }

    public async Task<string> GetFromCacheAsync(string key)
    {
        return await _database.StringGetAsync(key);
    }

    public async Task SaveToCacheAsync(string key, object value, TimeSpan timeToLive)
    {
        if (value == null) return;

        var jsonOptions = new JsonSerializerOptions();
        jsonOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        var redisValue = JsonSerializer.Serialize(value, jsonOptions);

        await _database.StringSetAsync(key, redisValue, timeToLive);
    }
}
