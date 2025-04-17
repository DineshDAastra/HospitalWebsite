import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { FaClock, FaEnvelope, FaPhone, FaBars } from "react-icons/fa";
import "./header.css";
import Logo from "../../../src/assets/img/Layer_1.svg";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  // const [pendingScrollId, setPendingScrollId] = useState(null);
  const [pendingScrollId, setPendingScrollId] = useState(null);
const [navigateHomeAfterLogout, setNavigateHomeAfterLogout] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutPopup(true); 
  };

  // const handleConfirmLogout = () => {
  //   setShowLogoutPopup(false);
  //   navigate("/"); 
  // };
  const handleConfirmLogout = () => {
    setShowLogoutPopup(false);
    if (navigateHomeAfterLogout) {
      setNavigateHomeAfterLogout(false);
      navigate("/"); // Go home
    } else if (pendingScrollId) {
      const idToScroll = pendingScrollId;
      setPendingScrollId(null);
      navigate("/", { replace: false });
      setTimeout(() => {
        const el = document.getElementById(idToScroll);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      navigate("/"); // Default fallback
    }
  };
  
  
  // const scrollTo = (id) => {
  //   navigate("/", { replace: false }); 
  //   setTimeout(() => {
  //     const element = document.getElementById(id);
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }, 100); 
  // };
  const scrollTo = (id) => {
    if (location.pathname === "/approved") {
      setShowLogoutPopup(true);
    } else {
      navigate("/", { replace: false });
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };
  
  const handleCancelLogout = () => {
    setShowLogoutPopup(false); 
  };
  return (
    <>
      <div className="top-header d-flex justify-content-center justify-content-md-between align-items-center w-100 px-3">
        <div className="header-info d-none d-md-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-1">
            <FaClock className="icon" />
            <span>Working Hours: 5 to 9 PM</span>
          </div>

          <span>|</span>

          <div className="d-flex align-items-center gap-1">
            <FaEnvelope className="icon" />
            <span>Email: info@aastratech.com</span>
          </div>

          <span>|</span>

          <div className="d-flex align-items-center gap-1">
            <FaPhone className="icon" />
            <a
              href="tel:+09710495064"
              className="text-white"
              style={{ textDecoration: "none" }}
            >
              Contact: +09710495064
            </a>
          </div>

          <span className="ms-auto">
            {location.pathname === "/approved" ? (
              <button
                onClick={handleLogoutClick}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            ) : (
              <a
                href="/login"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Login
              </a>
            )}
          </span>
        </div>
      </div>
      {showLogoutPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "400px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                borderBottom: "1px solid #dee2e6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5 style={{ margin: 0 }}>Confirm Logout</h5>
              <button
                onClick={handleCancelLogout}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  lineHeight: "1",
                  cursor: "pointer",
                  color: "#000",
                }}
              >
                &times;
              </button>
            </div>
            <div style={{ padding: "16px 24px", fontSize: "14px" }}>
              Are you sure you want to logout?
            </div>
            <div
              style={{
                padding: "12px 24px",
                borderTop: "1px solid #dee2e6",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                onClick={handleCancelLogout}
                style={{
                  background: "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "4px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                style={{
                  background: "#0d6efd",
                  color: "white",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "4px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar expand="lg" className="main-navbar px-5">
        <Container
          fluid
          className="d-flex align-items-center justify-content-between"
        >
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <img src={Logo} alt="Healthcare Logo" className="logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav">
            <FaBars />
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav" className="justify-content-center">
            <Nav className="mx-auto d-flex gap-3">
              {/* <Nav.Link href="/">Home</Nav.Link> */}
              <Nav.Link
  href="/"
  onClick={(e) => {
    e.preventDefault();
    if (location.pathname === "/approved") {
      setNavigateHomeAfterLogout(true);
      setShowLogoutPopup(true);
    } else {
      navigate("/");
    }
  }}
>
  Home
</Nav.Link>

<Nav.Link
  href=""
  onClick={(e) => {
    e.preventDefault();
    if (location.pathname === "/approved") {
      setShowLogoutPopup(true);
      setPendingScrollId("about");
    } else {
      scrollTo("about");
    }
  }}
>
  About
</Nav.Link>

              <Nav.Link
                href=""
                onClick={() => {
                  scrollTo("service");
                }}
              >
                Services
              </Nav.Link>
              <Nav.Link
                href=""
                onClick={() => {
                  scrollTo("whychooseus");
                }}
              >
                Why Choose Us
              </Nav.Link>
              <Nav.Link
                href=""
                onClick={() => {
                  scrollTo("testimonial");
                }}
              >
                Testimonials
              </Nav.Link>
              <Nav.Link
                href=""
                onClick={() => {
                  scrollTo("contact-form");
                }}
              >
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {location.pathname !== "/approved" && (
            <Button
              variant="primary"
              className="book-btn d-none d-md-block"
              href="#contact-form"
            >
              Book Appointment
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
