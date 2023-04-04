using System.Security.Claims;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Order;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Authorize]
  [Route("api/orders")]
  public class OrdersController : BaseApiController
  {
    private readonly IOrderService _orderService;
    private readonly IMapper _mapper;

    public OrdersController(IOrderService orderService, IMapper mapper)
    {
      _mapper = mapper;
      _orderService = orderService;
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
    {
      var email = User.RetriveEmail();
      var order = await _orderService.CreateOrderAsync(
          email,
          orderDto.DeliveryMethodId,
          orderDto.BasketId,
          orderDto.Address
      );

      if (order == null) return BadRequest(new ApiErrorResponse(400, "We've had a problem creating an order!"));
      return Ok(order);
    }
  }
}