using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.Order;

namespace API.Helpers
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      CreateMap<AppUser, UserDto>();
      CreateMap<Address, AddressDto>().ReverseMap();
      CreateMap<Order, OrderDto>();
      CreateMap<OrderItem, OrderItemDto>()
        .ForMember(d => d.ProductId,
          options => options.MapFrom(s => s.Product.ProductId))
        .ForMember(d => d.Name,
          options => options.MapFrom(s => s.Product.Name))
        .ForMember(d => d.Description,
          options => options.MapFrom(s => s.Product.Description))
        .ForMember(d => d.PictureUrl,
          options => options.MapFrom(s => s.Product.PictureUrl));
      CreateMap<Product, ProductDto>();
    }
  }
}