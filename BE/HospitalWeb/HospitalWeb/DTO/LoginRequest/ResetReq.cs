using System.ComponentModel.DataAnnotations;

namespace HospitalWeb.DTOModels.Auth
{
    public class ResetReq
    {
        public string UserIdentifier { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
