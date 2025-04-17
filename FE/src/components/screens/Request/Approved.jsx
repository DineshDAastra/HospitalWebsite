import React, { useEffect, useState } from "react";
import {
  getAllAppointment,
  updateAppointment,
} from "../../../client/Api/AppoinmentApi";
import "./approved.css";
// import { FaCheck, FaTimes, FaSearch, FaChevronDown } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Approved");
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAllAppointment();
      setAppointments((data?.data || []).reverse());
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // const handleStatusChange = async () => {
  //   if (selectedAppointments.length === 0 || !selectedStatus) {
  //     alert("Please select an appointment and a status.");
  //     return;
  //   }

  //   try {
  //     await Promise.all(
  //       selectedAppointments.map(async (id) => {
  //         await updateAppointment({ id, requestStatus: selectedStatus });
  //       })
  //     );

  //     setAppointments((prev) =>
  //       prev.map((appointment) =>
  //         selectedAppointments.includes(appointment.id)
  //           ? { ...appointment, requestStatus: selectedStatus }
  //           : appointment
  //       )
  //     );

  //     setSelectedAppointments([]);
  //     setSelectedStatus("");
  //   } catch (error) {
  //     console.error("Error updating appointments:", error);
  //   }
  // };
  const handleStatusChange = async () => {
    if (selectedAppointments.length === 0 || !selectedStatus) {
      alert("Please select an appointment and a status.");
      return;
    }
  
    try {
      // Update the appointments
      await Promise.all(
        selectedAppointments.map(async (id) => {
          await updateAppointment({ id, requestStatus: selectedStatus });
        })
      );
  
      // Update the state with new request status
      setAppointments((prev) =>
        prev.map((appointment) =>
          selectedAppointments.includes(appointment.id)
            ? { ...appointment, requestStatus: selectedStatus }
            : appointment
        )
      );
  
      // Clear selections
      setSelectedAppointments([]);
      setSelectedStatus("");
  
      // Show success toaster based on status
      if (selectedStatus === "Approved") {
        toast.success("Appointments approved successfully!");
      } else if (selectedStatus === "Rejected") {
        toast.error("Appointments rejected successfully!");
      }
  
    } catch (error) {
      console.error("Error updating appointments:", error);
      toast.error("An error occurred while updating appointments.");
    }
  };
  
  const handleCheckboxChange = (id) => {
    setSelectedAppointments((prev) =>
      prev.includes(id)
        ? prev.filter((appointmentId) => appointmentId !== id)
        : [...prev, id]
    );
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.phoneNumber.includes(searchTerm)
  );

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="container-fluid p-4">
      <div className="mb-3">
        <h2 className="mb-1 list">Appointment List</h2>
        {/* <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" className="text-warning">
                Home
              </a>
            </li>
            <li className="breadcrumb-item active">Appointment List</li>
          </ol>
        </nav> */}
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="d-flex align-items-center">
          <select
            className="form-select me-2"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button className="btn btn-outline-info" onClick={handleStatusChange}>
            Save
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="bg-light">
            <tr>
              <th className="text-center appointtable">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAppointments(
                        currentAppointments.map((appointment) => appointment.id)
                      );
                    } else {
                      setSelectedAppointments([]);
                    }
                  }}
                  checked={
                    selectedAppointments.length ===
                      currentAppointments.length &&
                    currentAppointments.length > 0
                  }
                />
              </th>
              <th className="appointtable">Appointment No</th>
              <th className="appointtable">Patient Name</th>
              <th className="appointtable">Phone</th>
              <th className="appointtable">Date</th>
              <th className="appointtable">Time</th>
              <th className="appointtable">Age</th>
              <th className="appointtable">Gender</th>
              <th className="appointtable">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.length > 0 ? (
              currentAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedAppointments.includes(appointment.id)}
                      onChange={() => handleCheckboxChange(appointment.id)}
                    />
                  </td>
                  <td>{appointment.id}</td>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.phoneNumber}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.availableTime}</td>
                  <td>{appointment.age}</td>
                  <td>{appointment.gender}</td>
                  <td>
                    <span
                      className={`badge ${
                        appointment.requestStatus === "Pending"
                          ? "bg-secondary"
                          : appointment.requestStatus === "Approved"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {appointment.requestStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-muted">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-muted">
            {filteredAppointments.length > 0
              ? `${indexOfFirstItem + 1} to ${Math.min(
                  indexOfLastItem,
                  filteredAppointments.length
                )} of ${filteredAppointments.length} `
              : "No records found"}
          </div>

          <div className="d-flex align-items-center">
            <span className="me-2">Rows per page:</span>
            <select
              className="form-select w-auto"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>

        <div className="btn-group">
          <button
            className="btn btn-outline-secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <button
            className="btn btn-outline-secondary"
            disabled={indexOfLastItem >= filteredAppointments.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTable;
