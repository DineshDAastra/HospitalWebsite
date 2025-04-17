using Azure.Communication.Email;
using Azure;
namespace HospitalWeb.Services.EmailServices
{
    public class EmailServices : IEmailServices
    {
        private readonly IConfiguration _configuration;
        public EmailServices(IConfiguration configuration)
        {
            _configuration = configuration;
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
    }
}
