using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
  public class ProductProfile : Profile
  {
    public ProductProfile()
    {
      CreateMap<Product, ProductDto>();
    }
  }
}