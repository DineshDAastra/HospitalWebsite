using System.ComponentModel.DataAnnotations;

namespace HospitalWeb.DTOModels.Auth
{
    public class ResetPassword
    {
        [Required(ErrorMessage = "Email or Phone is required.")]
        public string UserIdentifier { get; set; }
    }
}
