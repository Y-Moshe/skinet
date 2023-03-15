using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
  public class ProductProfile : Profile
  {
    public ProductProfile()
    {
      CreateMap<Product, ProductDto>()
        .ForMember(m => m.PictureUrl, options => options.MapFrom<ProductPictureUrlResolver>());
    }
  }
}