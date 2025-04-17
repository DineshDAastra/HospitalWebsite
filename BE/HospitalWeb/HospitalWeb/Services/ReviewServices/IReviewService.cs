using HospitalWeb.Models;

namespace HospitalWeb.Services.ReviewServices
{
    public interface IReviewService
    {
        public Task<List<Review>> GetAllReview();
        public Task<Review> GetReviewByID(int Id);
        public Task CreateReview(Review empReview);
        //public Task UpdateReview(Review empReview);
        public Task DeleteReview(int Id);
    }
}
