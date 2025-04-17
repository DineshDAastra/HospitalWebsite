using HospitalWeb.Repository;
using HospitalWeb.Data;
using HospitalWeb.Models;
using System.Diagnostics.Contracts;


namespace HospitalWeb.Services.AppointmentServices
{
    public class AppointmentServices : IAppointmentServices
    {
        private readonly IGenericRepository<Hospitaldetail> _Appointment;
        public AppointmentServices(IGenericRepository<Hospitaldetail> appointment)
        {
            _Appointment = appointment;
            
        }

        public async Task AddAppointment(Hospitaldetail appointmnet)
        {
            appointmnet.CreatedDate = DateTime.Now;

            await _Appointment.AddAsync(appointmnet);
        }
        public async Task<List<Hospitaldetail>> GetAllAppointments()  
        {
            return await _Appointment.GetAllAsync();
        }
        public async Task<Hospitaldetail> GetAppointmentById(int id)
        {
            return await _Appointment.GetByIdAsync(id);
        }
        public async Task UpdateAppointment(Hospitaldetail appointment)
        {
            await _Appointment.UpdateAsync(appointment);
        }
    }
}
