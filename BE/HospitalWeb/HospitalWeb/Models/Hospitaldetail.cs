using System;
using System.Collections.Generic;

namespace HospitalWeb.Models;

public  class Hospitaldetail
{
    public int Id { get; set; }

    public string? PatientName { get; set; }

    public string? PhoneNumber { get; set; }

    public DateTime? Date { get; set; }

    public int? Age { get; set; }

    public string? Gender { get; set; }

    public string? AvailableTime { get; set; }

    public DateTime? CreatedDate { get; set; }
}
