namespace Core.Entities.Order;

public class Order : BaseEntity
{
    public Order() { }
    public Order(
        string buyerEmail, OrderedAddress address,
        DeliveryMethod deliveryMethod, IReadOnlyList<OrderItem> items,
        decimal subtotal, string paymentIntentId)
    {
        BuyerEmail = buyerEmail;
        Address = address;
        DeliveryMethod = deliveryMethod;
        Items = items;
        Subtotal = subtotal;
        PaymentIntentId = paymentIntentId;
    }

    public string BuyerEmail { get; set; }
    public OrderedAddress Address { get; set; }
    public DeliveryMethod DeliveryMethod { get; set; }
    public IReadOnlyList<OrderItem> Items { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public string PaymentIntentId { get; set; }
    public decimal Subtotal { get; set; }
    public decimal GetTotal()
    {
        return Subtotal + DeliveryMethod.Price;
    }
}
