using HospitalWeb.DTO;
using RestSharp;
using HospitalWeb.Models;
using HospitalWeb.Services.AppointmentServices;
using HospitalWeb.Services.EmailServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace HospitalWeb.Controllers
{
  //  [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : Controller
    {
        private readonly IAppointmentServices _appointmentServices;
        private readonly IEmailServices _emailServices;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AppointmentController> _logger;
        public AppointmentController(IAppointmentServices appointment, IConfiguration configuration, IEmailServices email, ILogger<AppointmentController> logger)
        {
            _appointmentServices = appointment;
            _configuration = configuration;
            _emailServices = email;
            _logger = logger;

        }
        [HttpPost("Create")]
        public async Task<IActionResult> CreateAppointment([FromBody] AppointmentCreateDto appointmentCreateDto)
        {
            try
            {


                Hospitaldetail Details = new Hospitaldetail
                {
                    PatientName = appointmentCreateDto.PatientName,
                    Gender = appointmentCreateDto.Gender,
                    Age = appointmentCreateDto.Age,
                    PhoneNumber = appointmentCreateDto.PhoneNumber,
                    Reason= appointmentCreateDto.Reason,
                    Date = appointmentCreateDto.Date,
                    AvailableTime = appointmentCreateDto.AvailableTime,
                    RequestStatus = "Pending",

                };
                await _appointmentServices.AddAppointment(Details);
                string emailSubject = "Contacted From Hospital Web site";
                string emailBody = $@"
                                        <html>
                                        <body>
             <p>Dear <strong>Hospital Team</strong>,</p>
            <p>A new appointment has been booked through the hospital website.</p>
            
            <h3>Patient Details:</h3>
            <p><strong>Name:</strong> {Details.PatientName}</p>
            <p><strong>Gender:</strong> {Details.Gender}</p>
            <p><strong>Age:</strong> {Details.Age} years</p>
            <p><strong>Phone:</strong> {Details.PhoneNumber}</p>
            
            <h3>Appointment Details:</h3>
            <p><strong>Date:</strong> {Details.Date:MMMM dd, yyyy}</p>
            <p><strong>Time:</strong> {Details.AvailableTime}</p>
            
            
            <p>Please verify the appointment details and confirm with the patient.</p>
            
            <p>Best Regards,</p>
            <p><strong>Aastra Technology</strong></p>
                                        </body>
                                    </html>";
                string recipientEmail = _configuration["EmailCommunication:ReciverAddress"];
                byte[] attachment = null;
                string attachmentFileName = null;


                Task.Run(async () =>
                {
                    try
                    {
                        string emailResult = await _emailServices.SendEmailAsync(recipientEmail, emailSubject, emailBody, attachment, attachmentFileName);
                        if (emailResult != "Email sent successfully.")
                        {
                            _logger.LogWarning("Email sending failed: {emailResult}", emailResult);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error occurred while sending email.");
                    }
                });
                return Ok(new
                {
                    statusCode = 200,
                    message = "Appointment Created SuccessFully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { statuscode = 500, message = "Error while Add Appointment", error = ex.Message });
            }
            //return View(appointment);
        }
       
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllAppointments()
        {
            try
            {
                var appointments = await _appointmentServices.GetAllAppointments();
                return Ok(new
                {
                    statuscode = 200,
                    message = "Appointments retrieved successfully",
                    data = appointments
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    statusCode = 500,
                    message = "Error while retrieving appointments",
                    error = ex.Message
                });
            }
        }

    
        [HttpPost("UpdateRequest")]
        public async Task<IActionResult> UpdateRequest([FromBody] UpdateReqDto request)
        {
            try
            {
               
                if (request == null || request.Id <= 0 || string.IsNullOrEmpty(request.RequestStatus))
                {
                    return BadRequest(new { statuscode = 400, message = "Invalid request data." });
                }
                var appointment = await _appointmentServices.GetAppointmentById(request.Id);
                if (appointment == null)
                {
                    return NotFound(new { statuscode = 404, message = "Appointment not found." });
                }

                appointment.RequestStatus = request.RequestStatus;
                await _appointmentServices.UpdateAppointment(appointment);

                var formattedDate = appointment.Date?.ToString("dd-MM-yyyy");

                var message = request.RequestStatus == "Approved"
                    ? $"Dear {appointment.PatientName},\n\n" +
                    "Your appointment has been Approved. Please make sure to arrive on time.\n\n" +
                    $"Date: {formattedDate}\n" +
                    $"Time: {appointment.AvailableTime}.\n\n" +
                    "Thank you!\n\n" +
                    "Regards,\n[Balaji Ortho Care]"
                    : $"Dear {appointment.PatientName},\n\n" +
                    "Your appointment has been Rejected. Please contact the hospital for further assistance.\n\n" +
                     "Thank you!\n\n" +
                    "Regards,\n[Balaji Ortho Care]";

                var waapiBaseUrl = _configuration["WhatsAppConfig:MessageUrl"];
                var waapiToken = _configuration["WhatsAppConfig:Token"];
                var countryCode = _configuration["WhatsAppConfig:CountryCode"];
                var normalizedPhoneNumber = $"{countryCode}{appointment.PhoneNumber}";
                var chatId = $"{normalizedPhoneNumber}@c.us";

                var options = new RestClientOptions(waapiBaseUrl);
                var client = new RestClient(options);
                var waRequest = new RestRequest();
                waRequest.AddHeader("accept", "application/json");
                waRequest.AddHeader("authorization", waapiToken);
                waRequest.AddJsonBody(new
                {
                    chatId = chatId,
                    message = message
                });
                Task.Run(() => client.PostAsync(waRequest));

                return Ok(new
                {
                    statusCode = 200,
                    message = "Appointment status updated successfully and WhatsApp notification sent.",
                    data = appointment
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { statusCode = 500, message = "Error while updating appointment", error = ex.Message });
            }
        }



    }
}
