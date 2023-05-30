using API.Errors;
using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers;

[Route("api/payments")]
public class PaymentsController : BaseApiController
{
    private readonly IPaymentService _paymentService;
    private readonly IConfiguration _config;

    public PaymentsController(
        IPaymentService paymentService,
        IConfiguration config)
    {
        _paymentService = paymentService;
        _config = config;
    }

    [Authorize]
    [HttpPost("{basketId}")]
    public async Task<ActionResult<CustomerBasket>>
        SavePaymentIntent(string basketId)
    {
        var basket = await _paymentService.SavePaymentIntent(basketId);
        if (basket == null) return BadRequest(
            new ApiErrorResponse(400, "Had a problem with your shopping cart")
        );

        return basket;
    }

    [HttpPost("webhook")]
    public async Task<ActionResult> StripeWebhook()
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();

        var stripeWhEndpointSecret = _config["StripeSettings:WebhookEndpointSecret"];
        var stripeEvent = EventUtility.ConstructEvent(json,
            Request.Headers["Stripe-Signature"], stripeWhEndpointSecret);

        string paymentIntentId = ((PaymentIntent)stripeEvent.Data.Object).Id;
        OrderStatus orderStatus;
        switch (stripeEvent.Type)
        {
            case Events.PaymentIntentSucceeded:
                orderStatus = OrderStatus.PaymentReceived;
                break;
            case Events.PaymentIntentPaymentFailed:
                orderStatus = OrderStatus.PaymentFailed;
                break;

            default:
                orderStatus = OrderStatus.Pending;
                break;
        }

        await _paymentService.UpdateOrderStatus(paymentIntentId, orderStatus);

        return new EmptyResult();
    }
}
