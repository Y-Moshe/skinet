using System.ComponentModel.DataAnnotations;

namespace Core.Entities;

public class Category : BaseEntity
{
    [Required]
    public string Name { get; set; }
}
