using System.ComponentModel.DataAnnotations;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/basket")]
public class BasketController : BaseApiController
{
    private readonly IBasketRepository _basketRepository;
    public BasketController(IBasketRepository basketRepository)
    {
        _basketRepository = basketRepository;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CustomerBasket>>
        GetBasket([Required] string id)
    {
        var basket = await _basketRepository.GetBasketAsync(id);
        return Ok(basket ?? new CustomerBasket(id));
    }

    [HttpPut]
    public async Task<ActionResult<CustomerBasket>>
        UpdateBasket(CustomerBasket basket)
    {
        var updatedBasket = await _basketRepository.UpdateBasketAsync(basket);
        return Ok(updatedBasket);
    }

    [HttpDelete("{id}")]
    public async Task DeleteBasket([Required] string id)
    {
        await _basketRepository.DeleteBasketAsync(id);
    }
}
