using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      CreateMap<AppUser, UserDto>();
      CreateMap<Address, AddressDto>().ReverseMap();
      CreateMap<Product, ProductDto>()
        .ForMember(m => m.PictureUrl, options =>
          options.MapFrom<ProductPictureUrlResolver>());
    }
  }
}