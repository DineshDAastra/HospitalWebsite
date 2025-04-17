using HospitalWeb.DTO.Review;
using HospitalWeb.Models;
using HospitalWeb.Services;
using HospitalWeb.Services.ReviewServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HospitalWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;
        private readonly ILogger<ReviewController> _logger;

        public ReviewController(IReviewService reviewService, ILogger<ReviewController> logger)
        {
            _reviewService = reviewService;
            _logger = logger;


        }
        [HttpGet("GetAllReview")]

        public async Task<IActionResult> GetAllReview()
        {
            try
            {
                var tasks = await _reviewService.GetAllReview();

                if (tasks.Count == 0)
                {
                    return StatusCode(404, new
                    {
                        statusCode = 404,
                        message = "No Data Found"
                    });

                }
                var reponse = tasks.Select(tasks => new EmpReviewResponseDto
                {
                    Id = tasks.Id,
                    Name = tasks.Name,
                    Description = tasks.Description,
                    Rating = tasks.Rating,
                    CreatedDate = tasks.CreatedDate,
                    Status = tasks.Status,
                }).ToList();

                return Ok(reponse);
            }

            catch (Exception ex)
            {
                _logger.LogError("Error while Get All Data", ex.Message);
                return StatusCode(404, new { statusCode = 404, message = "error While fetching data" });
            }
        }
        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] EmpReviewCreateDto empReviewCreate)
        {
          

            try
            {
                Review empReview = new Review
                {
                    Name = empReviewCreate.Name,
                    Description = empReviewCreate.Description,
                    Rating = empReviewCreate.Rating,
                    Status = true,
                    CreatedDate = DateTime.UtcNow 
                };

                await _reviewService.CreateReview(empReview);

                return Ok(new
                {
                    statusCode = 200,
                    message = "Review Created Successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating review: {Message}", ex.Message);
                return StatusCode(500, new
                {
                    statusCode = 500,
                    message = "Error while creating review",
                    error = ex.Message
                });
            }
        }


        [HttpGet("GetById/{id}")]

        public async Task<IActionResult> GetaReviewbyId(int id)
        {
            var data = await _reviewService.GetReviewByID(id);
            var response = new EmpReviewResponseDto
            {
                Id = data.Id,
                Name = data.Name,
                CreatedDate = data.CreatedDate,
                Status = data.Status,
                Description = data.Description,
                Rating = data.Rating

            };
            return Ok(response);
        }
      

        [HttpPost("Delete/{Id}")]

        public async Task<IActionResult> Delete(int Id)
        {
            await _reviewService.DeleteReview(Id);
            return Ok(new
            {
                statusCode = 200,
                message = "Review Deleted Successfully"
            });
        }

    }
}
