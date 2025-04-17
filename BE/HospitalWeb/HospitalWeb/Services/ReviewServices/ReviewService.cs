using HospitalWeb.Models;
using HospitalWeb.Repository;
using HospitalWeb.Services.LoginServices;

namespace HospitalWeb.Services.ReviewServices
{
    public class ReviewService : IReviewService
    {
        private readonly IGenericRepository<Review> _empReview;
        //private readonly ILoginService _loginService;
        private readonly ILogger<ReviewService> _logger;
        //private readonly IHttpContextAccessor _contextAccessor;
  
    public ReviewService(IGenericRepository<Review> empReview, ILogger<ReviewService> logger)
    {
        _empReview = empReview;
        _logger = logger;
        //_loginService = loginService;

        //_contextAccessor = httpContextAccessor;
    }

    public async Task CreateReview(Review empReview)
    {
        try
        {
            await _empReview.AddAsync(empReview);
        }
        catch (Exception ex)
        {
            _logger.LogError("An error occurred while fetching all Task: {Message}", ex.Message);
            throw new Exception("Error retrieving Task list.", ex);

        }
    }

    public async Task DeleteReview(int Id)
    {
        var data = await _empReview.GetByIdAsync(Id);
        if (data != null)
        {
            data.Status = false;
            await _empReview.UpdateAsync(data);
        }
    }

    public async Task<List<Review>> GetAllReview()
    {
        var task = await _empReview.GetAllAsync(p => p.Status == true);
        return task;
    }

    public async Task<Review> GetReviewByID(int Id)
    {
        var task = await _empReview.GetByIdAsync(Id);
        return task;
    }

    //public Task UpdateReview(Review empReview)
    //{

    //    var task = _empReview.UpdateAsync(empReview);
    //    return task;

    //}
  }
}
