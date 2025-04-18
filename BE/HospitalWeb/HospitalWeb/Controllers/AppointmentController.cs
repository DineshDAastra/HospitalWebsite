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
                HospitalDetail Details = new HospitalDetail
                {
                    PatientName = appointmentCreateDto.PatientName,
                    Gender = appointmentCreateDto.Gender,
                    Age = appointmentCreateDto.Age,
                    PhoneNumber = appointmentCreateDto.PhoneNumber,
                    Reason = appointmentCreateDto.Reason,
                    Date = appointmentCreateDto.Date,
                    AvailableTime = appointmentCreateDto.AvailableTime,
                    RequestStatus = "Pending",
                };

                await _appointmentServices.AddAppointment(Details);

                // Prepare email
                string emailSubject = "Contacted From Hospital Website";
                string emailBody = $@"
            <html><body>
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
            </body></html>";

                string recipientEmail = _configuration["EmailCommunication:ReciverAddress"];
                string waapiBaseUrl = _configuration["WhatsAppConfig:MessageUrl"];
                string waapiToken = _configuration["WhatsAppConfig:Token"];
                string countryCode = _configuration["WhatsAppConfig:CountryCode"];

                Task.Run(async () =>
                {
                    try
                    {
                        // Send Email
                        string emailResult = await _emailServices.SendEmailAsync(recipientEmail, emailSubject, emailBody, null, null);
                        if (emailResult != "Email sent successfully.")
                        {
                            _logger.LogWarning("Email sending failed: {emailResult}", emailResult);
                        }

                        var client = new RestClient(new RestClientOptions(waapiBaseUrl));

                        // WhatsApp message to Doctor
                        string doctorNumber = "9751344979";
                        string chatIdDoctor = $"{countryCode}{doctorNumber}@c.us";
                        string doctorMessage = $"🩺 *New Appointment Booked*\n\n" +
                                               $"👤 *Patient:* {Details.PatientName}\n" +
                                               $"📞 *Phone:* {Details.PhoneNumber}\n" +
                                               $"📅 *Date:* {Details.Date:dd-MM-yyyy}\n" +
                                               $"⏰ *Time:* {Details.AvailableTime}\n" +
                                               $"📋 *Reason:* {Details.Reason}";

                        var requestToDoctor = new RestRequest();
                        requestToDoctor.AddHeader("accept", "application/json");
                        requestToDoctor.AddHeader("authorization", waapiToken);
                        requestToDoctor.AddJsonBody(new { chatId = chatIdDoctor, message = doctorMessage });
                        await client.PostAsync(requestToDoctor);

                        // WhatsApp message to Patient
                        string chatIdPatient = $"{countryCode}{Details.PhoneNumber}@c.us";
                        string patientMessage = $"🩺 Dear {Details.PatientName},\n\n" +
                        "Your appointment has been successfully registered with Balaji Ortho Care.\n\n" +
                        "For any further clarification, please contact the hospital directly.\n" +
                        $"📅 Date: {Details.Date:dd-MM-yyyy}\n" +
                        $"⏰ Time: {Details.AvailableTime}\n\n" +
                        "Please note: You will receive a confirmation message once the hospital verifies your preferred date and time.\n\n" +
                        "Regards,\nBalaji Ortho Care";

                        var requestToPatient = new RestRequest();
                        requestToPatient.AddHeader("accept", "application/json");
                        requestToPatient.AddHeader("authorization", waapiToken);
                        requestToPatient.AddJsonBody(new { chatId = chatIdPatient, message = patientMessage });
                        await client.PostAsync(requestToPatient);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error occurred while sending email or WhatsApp messages.");
                    }
                });

                return Ok(new
                {
                    statusCode = 200,
                    message = "Appointment Created Successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    statuscode = 500,
                    message = "Error while Adding Appointment",
                    error = ex.Message
                });
            }
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

                // Message to Patient
                string patientMessage = request.RequestStatus == "Approved"
                    ? $"🩺 Dear {appointment.PatientName},\n\n" +
                      "✅ Your appointment has been *Approved*.\n" +
                      $"📅 Date: {formattedDate}\n" +
                      $"⏰ Time: {appointment.AvailableTime}\n\n" +
                      "Please make sure to arrive on time.\n\n" +
                      "Regards,\n*Balaji Ortho Care*"
                    : $"🩺 Dear {appointment.PatientName},\n\n" +
                      "❌ Your appointment has been *Rejected*.\n" +
                      "Please contact the hospital for further assistance.\n\n" +
                      "Regards,\n*Balaji Ortho Care*";

                // Message to Doctor
                string doctorMessage = request.RequestStatus == "Approved"
                    ? $"📢 *Appointment Approved*\n\n" +
                      $"👤 Patient: {appointment.PatientName}\n" +
                      $"📞 Phone: {appointment.PhoneNumber}\n" +
                      $"📅 Date: {formattedDate}\n" +
                      $"⏰ Time: {appointment.AvailableTime}\n" +
                      $"✅ Status: Approved"
                    : $"📢 *Appointment Rejected*\n\n" +
                      $"👤 Patient: {appointment.PatientName}\n" +
                      $"📞 Phone: {appointment.PhoneNumber}\n" +
                      $"📅 Date: {formattedDate}\n" +
                      $"⏰ Time: {appointment.AvailableTime}\n" +
                      $"❌ Status: Rejected";

                var waapiBaseUrl = _configuration["WhatsAppConfig:MessageUrl"];
                var waapiToken = _configuration["WhatsAppConfig:Token"];
                var countryCode = _configuration["WhatsAppConfig:CountryCode"];

                var client = new RestClient(new RestClientOptions(waapiBaseUrl));

                // Send message to Patient
                var patientChatId = $"{countryCode}{appointment.PhoneNumber}@c.us";
                var patientRequest = new RestRequest();
                patientRequest.AddHeader("accept", "application/json");
                patientRequest.AddHeader("authorization", waapiToken);
                patientRequest.AddJsonBody(new { chatId = patientChatId, message = patientMessage });

                // Send message to Doctor
                var doctorNumber = "9751344979";
                var doctorChatId = $"{countryCode}{doctorNumber}@c.us";
                var doctorRequest = new RestRequest();
                doctorRequest.AddHeader("accept", "application/json");
                doctorRequest.AddHeader("authorization", waapiToken);
                doctorRequest.AddJsonBody(new { chatId = doctorChatId, message = doctorMessage });

                // Fire both messages in the background
                Task.Run(async () =>
                {
                    try
                    {
                        await client.PostAsync(patientRequest);
                        await client.PostAsync(doctorRequest);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error sending WhatsApp notifications.");
                    }
                });

                return Ok(new
                {
                    statusCode = 200,
                    message = "Appointment status updated successfully. Notifications sent to patient and doctor.",
                    data = appointment
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    statusCode = 500,
                    message = "Error while updating appointment",
                    error = ex.Message
                });
            }
        }


    }
}
