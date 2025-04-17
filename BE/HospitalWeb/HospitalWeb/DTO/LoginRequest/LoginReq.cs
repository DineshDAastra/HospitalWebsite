using System.ComponentModel.DataAnnotations;

namespace HospitalWeb.DTOModels.LoginRequest
{
    public class LoginReq
    {
        public string UserName { get; set; } 
        public string Password { get; set; }
    }
}

