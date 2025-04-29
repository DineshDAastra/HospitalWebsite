import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container, Offcanvas } from "react-bootstrap";
import { FaClock, FaEnvelope, FaPhone, FaBars } from "react-icons/fa";
import "./header.css";
import Logo from "../../../src/assets/img/Layer_1.svg";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [pendingScrollId, setPendingScrollId] = useState(null);
  const [navigateHomeAfterLogout, setNavigateHomeAfterLogout] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setShowLogoutPopup(false);
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    if (pendingScrollId) {
      const element = document.getElementById(pendingScrollId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setPendingScrollId(null); // Clear after scroll
    }
  }, [pendingScrollId]);

  // const scrollTo = (id) => {
  //   if (showMobileMenu) {
  //     setShowMobileMenu(false);
  //   }

  //   navigate("/", { replace: false });
  //   setTimeout(() => {
  //     const element = document.getElementById(id);
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }, 100);
  // };
  // const scrollTo = (id) => {
  //   if (showMobileMenu) {
  //     setShowMobileMenu(false);
  //   }

  //   if (location.pathname !== "/") {
  //     setPendingScrollId(id); // Save the target section ID
  //     navigate("/"); // Navigate to home
  //   } else {
  //     setTimeout(() => {
  //       const element = document.getElementById(id);
  //       if (element) {
  //         element.scrollIntoView({ behavior: "smooth" });
  //       }
  //     }, 100); // Short delay to allow the DOM to be ready
  //   }
  // };
  const scrollTo = (id) => {
    const isMobile = window.innerWidth <= 768; // Adjust the breakpoint if needed

    if (location.pathname !== "/") {
      setPendingScrollId(id);
      navigate("/");
    } else {
      setShowMobileMenu(false);

      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };

      if (isMobile) {
        setTimeout(scrollToElement, 400);
      } else {
        scrollToElement();
      }
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <>
      <div className="top-header d-none d-lg-flex justify-content-center justify-content-md-between align-items-center w-100 px-3">
        <div className="header-info d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-1">
            <FaClock className="icon" />
            <span>Working Hours: 5:00 PM to 9:00 PM</span>
          </div>

          <span>|</span>

          <div className="d-flex align-items-center gap-1">
            <FaEnvelope className="icon" />
            <a href="mailto:info@aastratech.com" className="text-white"
              style={{ textDecoration: "none" }}>Email: info@aastratech.com</a>
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
            {localStorage.getItem("loggedin") === "true" ? (
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

      <Navbar expand="lg" className="main-navbar px-3 py-2">
        <Container fluid className="mobile-header-container">
          {/* Logo */}
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <img
              src={Logo || "/placeholder.svg"}
              alt="Healthcare Logo"
              className="logo"
            />
            {/* <div className="d-none d-lg-block ms-2">
              <div className="fw-bold">HEALTHCARE</div>
              <div className="small text-muted">LOGO ICON</div>
            </div> */}
          </Navbar.Brand>
          <div className="d-flex d-lg-none align-items-center">
            {localStorage.getItem("loggedin") === "true" ? (
              <button onClick={handleLogoutClick} className="mobile-login-btn">
                Logout
              </button>
            ) : (
              <a href="/login" className="mobile-login-btn">
                Login
              </a>
            )}

            <button
              className="mobile-toggle-btn"
              onClick={() => setShowMobileMenu(true)}
              aria-controls="navbar-nav"
              aria-expanded={showMobileMenu}
            >
              <FaBars />
            </button>
          </div>

          <Navbar.Collapse
            id="navbar-nav"
            className="justify-content-center d-none d-lg-flex"
          >
            <Nav className="mx-auto d-flex gap-3">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link
                href=""
                onClick={() => {
                  scrollTo("about");
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
                  scrollTo("contact");
                }}
              >
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {location.pathname !== "/approved" && (
            <Button
              variant="primary"
              className="book-btn d-none d-lg-block"
              href="#contact-form"
            >
              Book Appointment
            </Button>
          )}
        </Container>
      </Navbar>

      {/* Mobile Menu */}

      <Offcanvas
        show={showMobileMenu}
        onHide={() => setShowMobileMenu(false)}
        placement="end"
        className="mobile-menu d-lg-none"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img
              src={Logo || "/placeholder.svg"}
              alt="Healthcare Logo"
              className="logo"
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column mb-4">
            <Nav.Link href="/" onClick={() => setShowMobileMenu(false)}>
              Home
            </Nav.Link>
            <Nav.Link href="" onClick={() => scrollTo("about")}>
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
            <Nav.Link href="" onClick={() => scrollTo("whychooseus")}>
              Why Choose Us
            </Nav.Link>
            <Nav.Link href="" onClick={() => scrollTo("testimonial")}>
              Testimonials
            </Nav.Link>
            <Nav.Link href="" onClick={() => scrollTo("contact")}>
              Contact
            </Nav.Link>
          </Nav>

          <div className="mobile-contact-info">
            <h6 className="mb-3">Contact Information</h6>
            <div className="d-flex align-items-center mb-3">
              <FaClock className="contact-icon me-2" />
              <span>Working Hours: 5:00 PM to 9:00 PM</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <FaEnvelope className="contact-icon me-2" />
              <a href="mailto:info@aastratech.com" className="text-black"
              style={{ textDecoration: "none" }}>Email: info@aastratech.com</a>
            </div>
            <div className="d-flex align-items-center mb-4">
              <FaPhone className="contact-icon me-2" />
              <a href="tel:+09710495064" className="mobile-contact-link">
                Contact: +09710495064
              </a>
            </div>

            {location.pathname !== "/approved" && (
              <Button
                variant="primary"
                className="w-100"
                href="#contact-form"
                onClick={() => setShowMobileMenu(false)}
              >
                Book Appointment
              </Button>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
