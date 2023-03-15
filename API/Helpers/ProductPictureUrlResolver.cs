using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
  public class ProductPictureUrlResolver : IValueResolver<Product, ProductDto, string>
  {
    private readonly IConfiguration _config;

    public ProductPictureUrlResolver(IConfiguration config)
    {
      _config = config;
    }

    public string Resolve(Product source, ProductDto destination, string destMember, ResolutionContext context)
    {
      if (!string.IsNullOrEmpty(source.PictureUrl))
      {
        return _config["ApiUrl"] + source.PictureUrl;
      }

      return null;
    }
  }
}