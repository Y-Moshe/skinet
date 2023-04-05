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
    public async Task<ActionResult<Order>> CreateOrder(OrderCreationDto orderCreationDto)
    {
      var email = User.RetriveEmail();
      var order = await _orderService.CreateOrderAsync(
          email,
          orderCreationDto.DeliveryMethodId,
          orderCreationDto.BasketId,
          orderCreationDto.Address
      );

      if (order == null) return BadRequest(new ApiErrorResponse(400, "We've had a problem creating an order!"));
      return Ok(_mapper.Map<OrderDto>(order));
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetUserOrders()
    {
      var email = User.RetriveEmail();
      var orders = await _orderService.GetUserOrdersAsync(email);

      return Ok(_mapper.Map<IReadOnlyList<OrderDto>>(orders));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> GetUserOrder(int id)
    {
      var email = User.RetriveEmail();
      var order = await _orderService.GetOrderByIdAsync(id, email);

      if (order == null) return NotFound(new ApiErrorResponse(404, "Couldn't find the order!"));
      return Ok(_mapper.Map<OrderDto>(order));
    }

    [HttpGet("delivery-methods")]
    public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
    {
      var methods = await _orderService.GetDeliveryMethodsAsync();
      return Ok(methods);
    }
  }
}