using HospitalWeb.DTOModels.LoginRequest;
using HospitalWeb.Models;

namespace HospitalWeb.Services
{
    public interface ILoginService
    {
       
        Task<User> GetUserByCredentials(LoginReq loginDetails);
    }
}
