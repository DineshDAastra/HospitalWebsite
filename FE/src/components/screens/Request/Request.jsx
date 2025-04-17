import React, { useEffect, useState } from 'react';
import { getAllAppointment, updateAppointment } from '../../../client/Api/AppoinmentApi'; 
import { FaCheck, FaTimes } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAppointments();
  }, [appointments]);
  const fetchAppointments = async () => {
    try {
      const data = await getAllAppointment();
      setAppointments((data?.data || []).reverse());
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await updateAppointment({ id, requestStatus: newStatus });
  
      if (response.statusCode === 200) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === id ? { ...appointment, requestStatus: newStatus } : appointment
          )
        );
      } else {
        console.error('Failed to update status:', response.message);
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };
  
  const filteredAppointments = appointments.filter((appointment) => {
    return (
      (appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.phoneNumber.includes(searchTerm)) &&
      (statusFilter ? appointment.requestStatus === statusFilter : true)
    );
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Appointments</h2>

      <div className="d-flex justify-content-between mb-3">
       
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by name or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="form-control w-25"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Patient Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.length > 0 ? (
              currentAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.phoneNumber}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.age}</td>
                  <td>{appointment.gender}</td>
                  <td>{appointment.availableTime}</td>
                  <td>
                    <span className={`badge 
                      ${appointment.requestStatus === 'Pending' ? 'bg-warning' : 
                      appointment.requestStatus === 'Approved' ? 'bg-success' : 
                      'bg-danger'}`}>
                      {appointment.requestStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm me-2 ${appointment.requestStatus === 'Approved' ? 'btn-success' : 'btn-outline-success'}`}
                      onClick={() => handleStatusChange(appointment.id, 'Approved')}
                      disabled={appointment.requestStatus === 'Approved'}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className={`btn btn-sm ${appointment.requestStatus === 'Rejected' ? 'btn-danger' : 'btn-outline-danger'}`}
                      onClick={() => handleStatusChange(appointment.id, 'Rejected')}
                      disabled={appointment.requestStatus === 'Rejected'}
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-danger">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          disabled={indexOfLastItem >= filteredAppointments.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AppointmentTable;
