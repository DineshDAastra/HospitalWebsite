using HospitalWeb.DTOModels.Auth;
using HospitalWeb.DTOModels.LoginRequest;
using HospitalWeb.Models;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace HospitalWeb.Services
{
    public interface ILoginService
    {
       
        Task<User> GetUserByCredentials(LoginReq loginDetails);
        Task<bool> ResetPassword(string userIdentifier, string newPassword,string phoneNumber);
    }
}
