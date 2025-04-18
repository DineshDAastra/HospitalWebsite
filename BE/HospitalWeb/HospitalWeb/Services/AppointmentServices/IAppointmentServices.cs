using HospitalWeb.Models;

namespace HospitalWeb.Services.AppointmentServices
{
    public interface IAppointmentServices
    {

        Task AddAppointment(HospitalDetail appointmnet);
        Task<List<HospitalDetail>> GetAllAppointments();
        Task<HospitalDetail> GetAppointmentById(int id);
        Task UpdateAppointment(HospitalDetail appointment);

    }
}
