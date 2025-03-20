import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import "./Footer.css";
import Logo from "../../../src/assets/img/Frame 74.svg"
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="container-fuild footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img
            src={Logo}
            alt="Healthcare Logo"
            className="logo"
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="row">
                <div className="col-12 col-md-6 footer-column">
                  <h3>Contact</h3>
                  <p>
                    <FaMapMarkerAlt className="icon" /> Santo Complex,
                    Truvancherry, Chennai
                  </p>
                  <p>
                    <FaEnvelope className="icon" /> info@aastratech.com
                  </p>
                  <p>
                    <FaPhone className="icon" /> +1 554 558 748
                  </p>
                </div>
                <div className="col-12 col-md-6 footer-column">
                  <h3>Company</h3>
                  <p>About</p>
                  <p>Appointment</p>
                  <p>Contact</p>
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
                  <p>Mon - Fri: 9.00am - 5.00pm</p>
                  <p>Saturday: 10.00am - 6.00pm</p>
                  <p>Sunday Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="text-white">
          © {currentYear} Aastratechnologies. All Rights Reserved by Aastra
          Technologies
        </p>
      </div>
    </footer>
  );
};

export default Footer;
