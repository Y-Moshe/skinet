using Core.Entities.Order;

namespace Core.Specifications;

public class PopulateOrderSpec : BaseSpecification<Order>
{
    public PopulateOrderSpec(string email) : base(o => o.BuyerEmail == email)
    {
        AddInclude(o => o.Items);
        AddInclude(o => o.DeliveryMethod);
        AddOrderByDesceding(o => o.CreatedAt);
    }

    public PopulateOrderSpec(int id, string email)
        : base(o => o.Id == id && o.BuyerEmail == email)
    {
        AddInclude(o => o.Items);
        AddInclude(o => o.DeliveryMethod);
    }
}
