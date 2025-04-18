//using HospitalWeb.DTOModels.LoginRequest;
//using HospitalWeb.Models;
//using HospitalWeb.Services;
//using Microsoft.AspNetCore.Mvc;
//using System.Threading.Tasks;
//using Microsoft.Extensions.Caching.Memory;
//using Microsoft.Extensions.Configuration;
//using HospitalWeb.Services.EmailServices;
//using Microsoft.AspNetCore.Identity.Data;
//using HospitalWeb.DTOModels.Auth;
//using HospitalWeb.Repository;
//using HospitalWeb.DTO.LoginRequest;

//namespace HospitalWeb.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class LoginController : ControllerBase
//    {
//        private readonly ILoginService _loginService;
//        private readonly IGenericRepository<User> _userRepository;
//        private readonly IEmailServices _emailServices;
//        private readonly IMemoryCache _memoryCache;
//        private readonly IConfiguration _configuration;

//        public LoginController(ILoginService loginService, IEmailServices emailServices,IMemoryCache memoryCache,IConfiguration configuration, IGenericRepository<User> userRepository)
//        {
//            _loginService = loginService;
//            _emailServices = emailServices;
//            _memoryCache = memoryCache;
//            _configuration = configuration;
//            _userRepository = userRepository;
//        }

//        [HttpPost("login")]
//        public async Task<IActionResult> Login([FromBody] LoginReq loginDetails)
//        {
//            try
//            {
//                if (loginDetails == null)
//                {
//                    return BadRequest(new { statusCode = 401, Message = "Login details are required." });
//                }

//                var user = await _loginService.GetUserByCredentials(loginDetails);

//                if (user == null)
//                {
//                    return Unauthorized(new { statusCode = 401, Message = "Invalid username or password." });
//                }

//                return Ok(new
//                {
//                    statusCode = 200,
//                    Message = "Login created successfully.",
//                    Data = new
//                    {
//                        user.UserId,
//                        user.Name,
//                        user.Email,
//                        user.Password
//                    }
//                });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, new { statusCode = 500, Message = "An unexpected error occurred."});
//            }
//        }
//        [HttpPost("reset-password")]
//        public async Task<IActionResult> ResetPasswordRequest([FromBody] ResetPassword request)
//        {
//            try
//            {
//                if (string.IsNullOrEmpty(request.UserIdentifier))
//                {
//                    return BadRequest(new { statusCode = 400, Message = "Email or Phone Number is required." });
//                }

//                bool isEmail = request.UserIdentifier.Contains("@");
//                bool isPhoneNumber = long.TryParse(request.UserIdentifier, out _);

//                var user = await _userRepository.FirstOrDefaultAsync(u =>
//                    u.Email == request.UserIdentifier || (isPhoneNumber && u.PhoneNumber == request.UserIdentifier));

//                if (user == null)
//                {
//                    return NotFound(new { statusCode = 404, Message = "User not found." });
//                }

//                // Generate OTP
//                var otp = new Random().Next(100000, 999999).ToString();
//                var expirationMinutes = int.Parse(_configuration["WhatsAppConfig:OtpExpirationMinutes"]);
//                var expirationTime = TimeSpan.FromMinutes(expirationMinutes);
//                _memoryCache.Set(request.UserIdentifier, otp, expirationTime);

//                // Send OTP
//                if (isEmail)
//                {
//                    _ = Task.Run(() => _emailServices.SendEmailOtpAsync(user.Email));
//                }
//                else
//                {
//                    _ = Task.Run(() => _emailServices.SendOtpAsync(user.PhoneNumber, otp));
//                }

//                return Ok(new { statusCode = 200, Message = "OTP has been sent successfully." });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, new { statusCode = 500, Message = $"An error occurred: {ex.Message}" });
//            }
//        }

//        [HttpPost("verify-otp")]
//        public IActionResult VerifyOtp([FromBody] OtpReq model)
//        {
//            try
//            {
//                if (string.IsNullOrEmpty(model.UserIdentifier) || string.IsNullOrEmpty(model.Otp))
//                {
//                    return BadRequest(new { statusCode = 400, Message = "User Identifier and OTP are required." });
//                }

//                if (!_memoryCache.TryGetValue(model.UserIdentifier, out string storedOtp))
//                {
//                    return BadRequest(new { statusCode = 400, Message = "OTP has expired or is invalid." });
//                }

//                if (storedOtp != model.Otp)
//                {
//                    return Unauthorized(new { statusCode = 401, Message = "Invalid OTP. Please try again." });
//                }

//                _memoryCache.Remove(model.UserIdentifier);

//                return Ok(new { statusCode = 200, Message = "OTP Verified! You can now reset your password." });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, new { statusCode = 500, Message = $"An error occurred: {ex.Message}" });
//            }
//        }
//        [HttpPost("change-password")]
//        public async Task<IActionResult> ChangePassword([FromBody] ResetReq model)
//        {
//            try
//            {
//                if (string.IsNullOrEmpty(model.UserIdentifier) ||
//                    string.IsNullOrEmpty(model.NewPassword) ||
//                    string.IsNullOrEmpty(model.ConfirmPassword))
//                {
//                    return BadRequest(new
//                    {
//                        statusCode = 400,
//                        Message = "UserIdentifier, NewPassword, and ConfirmPassword are required."
//                    });
//                }

//                if (model.NewPassword != model.ConfirmPassword)
//                {
//                    return BadRequest(new
//                    {
//                        statusCode = 400,
//                        Message = "New Password and Confirm Password do not match."
//                    });
//                }

//                var user = await _userRepository.FirstOrDefaultAsync(u =>
//                    u.Email == model.UserIdentifier || u.PhoneNumber == model.UserIdentifier);

//                if (user == null)
//                {
//                    return NotFound(new { statusCode = 404, Message = "User not found." });
//                }

//                // OPTIONAL: Check if NewPassword is same as old one
//                if (user.Password == model.NewPassword)
//                {
//                    return BadRequest(new
//                    {
//                        statusCode = 400,
//                        Message = "New password cannot be the same as the old password."
//                    });
//                }

//                user.Password = model.NewPassword;
//                await _userRepository.UpdateAsync(user);

//                return Ok(new
//                {
//                    statusCode = 200,
//                    Message = "Password changed successfully. Please login again."
//                });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, new { statusCode = 500, Message = $"An error occurred: {ex.Message}" });
//            }
//        }


//    }
//}
using HospitalWeb.DTOModels.LoginRequest;
using HospitalWeb.Models;
using HospitalWeb.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using HospitalWeb.Services.EmailServices;
using HospitalWeb.DTO.LoginRequest;
using HospitalWeb.Repository;
using HospitalWeb.DTOModels.Auth;

namespace HospitalWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;
        private readonly IGenericRepository<User> _userRepository;
        private readonly IEmailServices _emailServices;
        private readonly IMemoryCache _memoryCache;
        private readonly IConfiguration _configuration;

        public LoginController(
            ILoginService loginService,
            IEmailServices emailServices,
            IMemoryCache memoryCache,
            IConfiguration configuration,
            IGenericRepository<User> userRepository)
        {
            _loginService = loginService;
            _emailServices = emailServices;
            _memoryCache = memoryCache;
            _configuration = configuration;
            _userRepository = userRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginReq loginDetails)
        
        {
            try
            {
                if (loginDetails == null || string.IsNullOrEmpty(loginDetails.UserName) || string.IsNullOrEmpty(loginDetails.Password))
                {
                    return BadRequest(new { statusCode = 400, Message = "Login details are required." });
                }

                var user = await _loginService.GetUserByCredentials(loginDetails);

                if (user != null)
                {
                    if(user.Password == loginDetails.Password)
                    {
                        return Ok(new
                        {
                            statusCode = 200,
                            Message = "Login successful.",
                            Data = new
                            {
                                user.UserId,
                                user.Name,
                                user.Email
                                // Do NOT return password
                            }
                        });
                    }
                    else
                    {
                        return BadRequest(new
                        {
                            statusCode = 400,
                            Message = "invalid username or password.",
                        });
                    }
                }
                else
                {
                    return NotFound(new
                    {
                        statusCode = 404,
                        Message = "User Not Found",
                    });
                }
               
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { statusCode = 500, Message = "An unexpected error occurred." });
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPasswordRequest([FromBody] ResetPassword request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.UserIdentifier))
                {
                    return BadRequest(new { statusCode = 400, Message = "Email or Phone Number is required." });
                }

                bool isEmail = request.UserIdentifier.Contains("@");
                bool isPhoneNumber = long.TryParse(request.UserIdentifier, out _);

                var user = await _userRepository.FirstOrDefaultAsync(u =>
                    u.Email == request.UserIdentifier || (isPhoneNumber && u.PhoneNumber == request.UserIdentifier));

                if (user == null)
                {
                    return NotFound(new { statusCode = 404, Message = "User not found." });
                }

                var otp = new Random().Next(100000, 999999).ToString();
                var expirationMinutes = int.Parse(_configuration["WhatsAppConfig:OtpExpirationMinutes"]);
                _memoryCache.Set(request.UserIdentifier, otp, TimeSpan.FromMinutes(expirationMinutes));

                if (isEmail)
                {
                    _ = Task.Run(() => _emailServices.SendEmailOtpAsync(user.Email));
                }
                else
                {
                    _ = Task.Run(() => _emailServices.SendOtpAsync(user.PhoneNumber, otp));
                }

                return Ok(new { statusCode = 200, Message = "OTP has been sent successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { statusCode = 500, Message = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpPost("verify-otp")]
        public IActionResult VerifyOtp([FromBody] OtpReq model)
        {
            try
            {
                if (string.IsNullOrEmpty(model.UserIdentifier) || string.IsNullOrEmpty(model.Otp))
                {
                    return BadRequest(new { statusCode = 400, Message = "User Identifier and OTP are required." });
                }

                if (!_memoryCache.TryGetValue(model.UserIdentifier, out string storedOtp))
                {
                    return BadRequest(new { statusCode = 400, Message = "OTP has expired or is invalid." });
                }

                if (storedOtp != model.Otp)
                {
                    return Unauthorized(new { statusCode = 401, Message = "Invalid OTP. Please try again." });
                }

                _memoryCache.Remove(model.UserIdentifier);

                return Ok(new { statusCode = 200, Message = "OTP Verified! You can now reset your password." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { statusCode = 500, Message = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ResetReq model)
        {
            try
            {
                if (string.IsNullOrEmpty(model.UserIdentifier) ||
                    string.IsNullOrEmpty(model.NewPassword) ||
                    string.IsNullOrEmpty(model.ConfirmPassword))
                {
                    return BadRequest(new
                    {
                        statusCode = 400,
                        Message = "UserIdentifier, NewPassword, and ConfirmPassword are required."  
                    });
                }

                if (model.NewPassword != model.ConfirmPassword)
                {
                    return BadRequest(new
                    {
                        statusCode = 400,
                        Message = "New Password and Confirm Password do not match."
                    });
                }

                var user = await _userRepository.FirstOrDefaultAsync(u =>
                    u.Email == model.UserIdentifier || u.PhoneNumber == model.UserIdentifier);

                if (user == null)
                {
                    return NotFound(new { statusCode = 404, Message = "User not found." });
                }

                if (user.Password == model.NewPassword)
                {
                    return BadRequest(new
                    {
                        statusCode = 400,
                        Message = "New password cannot be the same as the confirm password."
                    });
                }

                user.Password = model.NewPassword;
                await _userRepository.UpdateAsync(user);

                return Ok(new
                {
                    statusCode = 200,
                    Message = "Password changed successfully. Please login again."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { statusCode = 500, Message = $"An error occurred: {ex.Message}" });
            }
        }
    }
}
