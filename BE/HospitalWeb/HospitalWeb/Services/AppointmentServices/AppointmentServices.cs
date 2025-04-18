using HospitalWeb.Repository;
using HospitalWeb.Data;
using HospitalWeb.Models;
using System.Diagnostics.Contracts;


namespace HospitalWeb.Services.AppointmentServices
{
    public class AppointmentServices : IAppointmentServices
    {
        private readonly IGenericRepository<HospitalDetail> _Appointment;
        public AppointmentServices(IGenericRepository<HospitalDetail> appointment)
        {
            _Appointment = appointment;
            
        }

        public async Task AddAppointment(HospitalDetail appointmnet)
        {
            appointmnet.CreatedDate = DateTime.Now;

            await _Appointment.AddAsync(appointmnet);
        }
        public async Task<List<HospitalDetail>> GetAllAppointments()  
        {
            return await _Appointment.GetAllAsync();
        }
        public async Task<HospitalDetail> GetAppointmentById(int id)
        {
            return await _Appointment.GetByIdAsync(id);
        }
        public async Task UpdateAppointment(HospitalDetail appointment)
        {
            await _Appointment.UpdateAsync(appointment);
        }
    }
}
