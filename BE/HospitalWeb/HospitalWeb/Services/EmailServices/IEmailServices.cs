namespace HospitalWeb.Services.EmailServices
{
    public interface IEmailServices
    {
        Task<string> SendEmailAsync(string to, string subject, string body, byte[] attachment, string attachmentFileName);
        Task<string> SendOtpAsync(string phoneNumber, string otp);
        Task<string> SendEmailOtpAsync(string to);
    }
}
