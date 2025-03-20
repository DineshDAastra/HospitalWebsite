import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { FaClock, FaEnvelope, FaPhone, FaBars } from "react-icons/fa";
import "./header.css";
import Logo from "../../../src/assets/img/Layer_1.svg";
const Header = () => {
  return (
    <>
      
      <div className="top-header d-flex justify-content-center justify-content-md-between align-items-center w-100 px-3">
        <div className="header-info d-none d-md-flex">
          <FaClock className="icon" /> Working Hours: 09:00 AM to 05:00 PM &nbsp; | &nbsp;
          <FaEnvelope className="icon" /> Email: sanjay@jasstratech.com &nbsp; | &nbsp;
          <FaPhone className="icon" /> Contact: +123 (456) 789
        </div>
      </div>

      <Navbar expand="lg" className="main-navbar px-5">
        <Container fluid className="d-flex align-items-center justify-content-between">
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <img
              src={Logo}
              alt="Healthcare Logo"
              className="logo"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav">
            <FaBars />
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav" className="justify-content-center">
            <Nav className="mx-auto d-flex gap-3">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link href="#">Services</Nav.Link>
              <Nav.Link href="#">Why Choose Us</Nav.Link>
              <Nav.Link href="#">Clinics</Nav.Link>
              <Nav.Link href="#">Testimonials</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Button variant="primary" className="book-btn d-none d-md-block">
            Book Appointment
          </Button>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
