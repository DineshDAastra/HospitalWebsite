using HospitalWeb.DTOModels.LoginRequest;
using HospitalWeb.Models;
using HospitalWeb.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HospitalWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginReq loginDetails)
        {
            try
            {
                if (loginDetails == null)
                {
                    return BadRequest(new { statusCode = 401, Message = "Login details are required." });
                }

                var user = await _loginService.GetUserByCredentials(loginDetails);

                if (user == null)
                {
                    return Unauthorized(new { statusCode = 401, Message = "Invalid username or password." });
                }

                return Ok(new
                {
                    statusCode = 200,
                    Message = "Login created successfully.",
                    Data = new
                    {
                        user.UserId,
                        user.Name,
                        user.Email,
                        user.Password
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { statusCode = 500, Message = "An unexpected error occurred."});
            }
        }


    }
}
