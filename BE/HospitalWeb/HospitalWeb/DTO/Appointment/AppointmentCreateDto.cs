namespace HospitalWeb.DTO
{
    public class AppointmentCreateDto
    {
        public string? PatientName { get; set; }

        public string? PhoneNumber { get; set; }
        public string? Reason { get; set; }

        public DateTime? Date { get; set; }

        public int? Age { get; set; }

        public string? Gender { get; set; }

        public string? AvailableTime { get; set; }
        public string? RequestStatus { get; set; }
    }
}
