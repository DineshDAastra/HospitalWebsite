using HospitalWeb.Models;
using HospitalWeb.Repository;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using HospitalWeb.DTOModels.LoginRequest;
using AastraPeople.Services.LoginServices;

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
        public async Task<bool> ResetPassword(string userIdentifier, string newPassword,string phoneNumber)
        {
            try
            {
                // Ensure the password meets strength requirements
                if (!IsPasswordValid(newPassword))
                {
                    _logger.LogWarning("Invalid password format.");
                    return false;
                }

                List<User> users;
                if (long.TryParse(userIdentifier, out var phone))
                {
                    users = await _employeeRepository.GetAllAsync(
                        filter: e => e.PhoneNumber == phoneNumber);
                }
                else
                {
                    users = await _employeeRepository.GetAllAsync(
                        filter: e => e.Email == userIdentifier
                    );
                }

                if (users != null && users.Any())
                {
                    var user = users.FirstOrDefault();
                    if (user != null)
                    {
                        user.Password = PasswordHelper.HashPassword(newPassword); // Ensure the password is hashed securely
                        await _employeeRepository.UpdateAsync(user);
                        _logger.LogInformation($"Password reset successfully for user {userIdentifier}.");
                        return true;
                    }
                }

                _logger.LogWarning($"No user found with identifier {userIdentifier}.");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error resetting Password for user identification {userIdentifier}: {ex.Message}");
                throw;
            }
        }
        private bool IsPasswordValid(string password)
        {
            if (string.IsNullOrEmpty(password) || password.Length < 8)
            {
                return false;
            }

            // Additional password complexity checks can be added here (e.g., number, uppercase, special characters)
            return true;
        }
    }
}
