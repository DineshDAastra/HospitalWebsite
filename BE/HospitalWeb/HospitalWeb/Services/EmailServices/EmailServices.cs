using Azure.Communication.Email;
using Azure;
using RestSharp;
using Microsoft.Extensions.Caching.Memory;
namespace HospitalWeb.Services.EmailServices
{
    public class EmailServices : IEmailServices
    {
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _memoryCache;

        public EmailServices(IConfiguration configuration,IMemoryCache memoryCache)
        {
            _configuration = configuration;
            _memoryCache = memoryCache;
        }
        public async Task<string> SendEmailAsync(string to, string subject, string body, byte[] attachment, string attachmentFileName)
        {
            string connectionString = _configuration["EmailCommunication:ConnectionString"];
            string senderAddress = _configuration["EmailCommunication:SenderAddress"];
            try
            {
                var emailClient = new EmailClient(connectionString);
                var recipients = new EmailRecipients(new List<EmailAddress> { new EmailAddress(to) });
                var emailContent = new EmailContent(subject)
                {
                    PlainText = body,
                    Html = $"<html><body>{body}</body></html>"
                };
                var emailMessage = new EmailMessage(
                    senderAddress: senderAddress,
                    recipients: recipients,
                    content: emailContent
                    );
                if (attachment != null && attachment.Length > 0)
                {
                    var emailAttachment = new EmailAttachment(
                        name: attachmentFileName,
                        contentType: "application/octet-stream",
                        content: BinaryData.FromBytes(attachment)
                        );
                    emailMessage.Attachments.Add(emailAttachment);
                }
                EmailSendOperation emailSendOperation = await emailClient.SendAsync(WaitUntil.Completed, emailMessage);
                if (emailSendOperation.HasCompleted)
                {
                    return "Email sent successfully.";
                }
                else
                {
                    return "Email send operation failed.";
                }
            }
            catch (RequestFailedException ex)
            {
                return $"Azure Communication Services Error:{ex.Message}";
            }
            catch (Exception ex)
            {
                return $"General Error: {ex.Message}";
            }

        }
        public async Task<string> SendEmailOtpAsync(string to)
        {
            string connectionString = _configuration["EmailCommunication:ConnectionString"];
            string senderAddress = _configuration["EmailCommunication:SenderAddress"];

            try
            {
                // Generate a 6-digit OTP
                var otp = new Random().Next(100000, 999999).ToString();

                // Store OTP in cache (Example: MemoryCache)
                var expirationMinutes = int.Parse(_configuration["WhatsAppConfig:OtpExpirationMinutes"]);
                var expirationTime = TimeSpan.FromMinutes(expirationMinutes);
                _memoryCache.Set(to, otp, expirationTime);

                // Prepare email content
                string subject = "Your OTP Code";
                string body = $"Your One-Time Password (OTP) is: <b>{otp}</b>. It is valid for {expirationMinutes} minutes.";

                var emailClient = new EmailClient(connectionString);
                var recipients = new EmailRecipients(new List<EmailAddress> { new EmailAddress(to) });
                var emailContent = new EmailContent(subject)
                {
                    PlainText = $"Your One-Time Password (OTP) is: {otp}. It is valid for {expirationMinutes} minutes.",
                    Html = $"<html><body>Your OTP is: <b>{otp}</b>. It is valid for {expirationMinutes} minutes.</body></html>"
                };

                var emailMessage = new EmailMessage(
                    senderAddress: senderAddress,
                    content: emailContent,
                    recipients: recipients
                );

                EmailSendOperation emailSendOperation = await emailClient.SendAsync(WaitUntil.Completed, emailMessage);
                return emailSendOperation.HasCompleted ? "OTP sent successfully via Email." : "Email send operation failed.";
            }
            catch (RequestFailedException ex)
            {
                return $"Azure Communication Services Error: {ex.Message}";
            }
            catch (Exception ex)
            {
                return $"General Error: {ex.Message}";
            }
        }


        public async Task<string> SendOtpAsync(string phoneNumber, string otp)
        {
            try
            {
                var waapiBaseUrl = _configuration["WhatsAppConfig:MessageUrl"];
                var waapiToken = _configuration["WhatsAppConfig:Token"];
                var countryCode = _configuration["WhatsAppConfig:CountryCode"];

                var normalizedPhoneNumber = $"{countryCode}{phoneNumber}";
                var chatId = $"{normalizedPhoneNumber}@c.us";
                var messageContent = $"Your OTP is: {otp}. Please use this code to verify your account.";

                var options = new RestClientOptions(waapiBaseUrl);
                var client = new RestClient(options);
                var waRequest = new RestRequest();
                waRequest.AddHeader("accept", "application/json");
                waRequest.AddHeader("authorization", waapiToken);
                waRequest.AddJsonBody(new
                {
                    chatId = chatId,
                    message = messageContent
                });

                await client.PostAsync(waRequest);
                return "WhatsApp OTP sent successfully.";
            }
            catch (Exception ex)
            {
                return $"WhatsApp API Error: {ex.Message}";
            }
        }
    }
}
