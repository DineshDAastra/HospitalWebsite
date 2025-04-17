using HospitalWeb.Models;
using HospitalWeb.Repository;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using HospitalWeb.DTOModels.LoginRequest;

namespace HospitalWeb.Services.LoginServices
{
    public class LoginService : ILoginService
    {
        private readonly IGenericRepository<User> _employeeRepository;
        private readonly ILogger<User> _logger;
        //private readonly IHttpContextAccessor _httpContextAccessor;

        public LoginService(IGenericRepository<User> employeeRepository, ILogger<User> logger)
        {
            _employeeRepository = employeeRepository;
            _logger = logger;
            //_httpContextAccessor = httpContextAccessor;
        }

        public async Task<User> GetUserByCredentials(LoginReq loginDetails)
        {
            try
            {
                var users = await _employeeRepository.GetAllAsync(
      filter: e => (e.PhoneNumber.ToString() == loginDetails.UserName || e.Email == loginDetails.UserName)
  );


                return users.FirstOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error during login attempt for user {loginDetails.UserName}: {ex.Message}");
                throw;
            }
        }



    }
}
