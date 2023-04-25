using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class FallbackController : Controller
  {
    public IActionResult Index()
    {
      var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");
      return PhysicalFile(path, "text/html");
    }
  }
}