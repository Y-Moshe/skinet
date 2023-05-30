using System.ComponentModel.DataAnnotations;

namespace Core.Entities;

public class Brand : BaseEntity
{
    [Required]
    public string Name { get; set; }
}
