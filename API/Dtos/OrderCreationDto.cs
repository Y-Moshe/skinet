using Core.Entities.Order;

namespace API.Dtos;

public class OrderCreationDto
{
    public string BasketId { get; set; }
    public int DeliveryMethodId { get; set; }
    public OrderedAddress Address { get; set; }
}
