using HospitalWeb.Models;

namespace HospitalWeb.Services.AppointmentServices
{
    public interface IAppointmentServices
    {

        Task AddAppointment(Hospitaldetail appointmnet);
        Task<List<Hospitaldetail>> GetAllAppointments();
        Task<Hospitaldetail> GetAppointmentById(int id);
        Task UpdateAppointment(Hospitaldetail appointment);

    }
}
