using System.Text;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
  public class UseCacheAttribute : Attribute, IAsyncActionFilter
  {
    private readonly int _timeToLiveInSec;
    public UseCacheAttribute(int timeToLiveInSec)
    {
      _timeToLiveInSec = timeToLiveInSec;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {

      var config = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
      var USE_CACHE = config.GetValue<bool>("UseCache");
      if (!USE_CACHE)
      {
        await next();
        return;
      }

      var cacheService = context.HttpContext.RequestServices.GetRequiredService<ICacheService>();
      // Get cache key based on request query parameters
      var cacheKey = GenerateCacheKeyFromRequest(context.HttpContext.Request);

      var cacheValue = await cacheService.GetFromCacheAsync(cacheKey);
      // Return cache value if not empty or null
      if (!string.IsNullOrEmpty(cacheValue))
      {
        var contentResult = new ContentResult
        {
          Content = cacheValue,
          ContentType = "application/json",
          StatusCode = 200,
        };

        context.Result = contentResult;
        return;
      }

      // Proceed to controller function and then save the response to cache
      var executedContext = await next();
      if (executedContext.Result is OkObjectResult result)
      {
        await cacheService.SaveToCacheAsync(cacheKey,
            result.Value, TimeSpan.FromSeconds(_timeToLiveInSec));
      }
    }

    private string GenerateCacheKeyFromRequest(HttpRequest request)
    {
      var keyBuilder = new StringBuilder();
      keyBuilder.Append($"{request.Path}");

      request.Query
        .OrderBy(x => x.Key)
        .ToList()
        .ForEach(x => keyBuilder.Append($"|{x.Key}={x.Value}"));

      return keyBuilder.ToString();
    }
  }
}