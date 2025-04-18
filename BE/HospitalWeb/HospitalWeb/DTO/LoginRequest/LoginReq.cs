using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace HospitalWeb.DTOModels.LoginRequest
{
    public class LoginReq
    {
        public string UserName { get; set; } 
        public string Password { get; set; }
    }
    public class ValidUserIdentifierAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var userIdentifier = value as string;
            if (string.IsNullOrEmpty(userIdentifier))
            {
                return new ValidationResult("User Identifier is required.");
            }

            var isEmail = Regex.IsMatch(userIdentifier, @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            var isMobile = Regex.IsMatch(userIdentifier, @"^\+?\d{8,15}$");

            if (!isEmail && !isMobile)
            {
                return new ValidationResult("User Identifier must be a valid email address or mobile number.");
            }

            return ValidationResult.Success;
        }
    }
}


