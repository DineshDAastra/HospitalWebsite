using System;
using System.Collections.Generic;

namespace HospitalWeb.Models;

public partial class Review
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int? Rating { get; set; }

    public bool? Status { get; set; }

    public DateTime? CreatedDate { get; set; }
}
