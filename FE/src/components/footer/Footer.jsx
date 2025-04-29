import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import "./Footer.css";
import Logo from "../../../src/assets/img/Frame 74.svg";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="container-fuild footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={Logo} alt="Healthcare Logo" className="logo" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="row">
                <div className="col-12 col-md-6 footer-column">
                  <h3>Contact</h3>
                  <a
                    href="https://maps.app.goo.gl/qzT9fD24woh5oNWi6"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p>
                      <FaMapMarkerAlt className="icon" /> 79, Vetri Vinayagar,
                      Koil St, Tiruvalleeswarar Nagar, Anna Nagar West, Chennai,
                      Tamil Nadu 600040
                    </p>
                  </a>

                  <p>
                    <a href="mailto:info@aastratech.com" className="text-white"
              style={{ textDecoration: "none" }}>
                      <FaEnvelope className="icon" /> info@aastratech.com
                    </a>
                  </p>
                  <p>
                    <a href="tel:+09710495064" className="text-white"
              style={{ textDecoration: "none" }}>
                      <FaPhone className="icon" /> + 09710495064
                    </a>
                  </p>
                </div>
                <div className="col-12 col-md-6 footer-column">
                  <h3>Company</h3>
                  <p>
                    <a
                      href="#about"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      About
                    </a>
                  </p>
                  <p>
                    <a
                      href="#contact-form"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Appointment
                    </a>
                  </p>
                  <p>
                    <a
                      href="#contact-form"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Contact
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="row">
                <div className="col-12 col-md-6 footer-column">
                  <h3>Our Services</h3>
                  <p>Orthopaedic</p>
                  <p>Neurology</p>
                  <p>Cardiology</p>
                </div>
                <div className="col-12 col-md-6 footer-column">
                  <h3>Working Time</h3>
                  <p>Mon - Sun: 5:00 PM - 9:00 PM</p>
                  {/* <p>Saturday: 10.00am - 6.00pm</p>
                  <p>Sunday Closed</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="text-white">© {currentYear} Balaji Ortho Care.</p>
      </div>
    </footer>
  );
};

export default Footer;
