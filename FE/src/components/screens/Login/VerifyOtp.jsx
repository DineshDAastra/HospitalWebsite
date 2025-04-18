import React, { useState, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { VerifyOtp } from "../../../client/Api/AppoinmentApi";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Consultation1 from "../../../../src/assets/img/image 2.svg";
// import otpImage from "../../../assets/otp-image.png"; // replace with your image path
import { toast } from "react-toastify";
const VerifyOtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userIdentifier = location.state?.userIdentifier;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     const enteredOtp = otp.join("");

//     try {
//       const payload = { userIdentifier, otp: enteredOtp };
//       const res = await VerifyOtp(payload);

//       if (res.statusCode === 200) {
//         toast.success(response.message, {
//           autoClose: 2000,
//           position: "top-right",
//         });
//         navigate("/new-password", { state: { userIdentifier } });
//       } else {
//         toast.error(errorMessage, {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         a;
//       }
//     } catch (err) {
//       console.error("OTP verification failed:", err);
//       toast.error("Something went wrong. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };
const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
  
    try {
      const payload = { userIdentifier, otp: enteredOtp };
      const res = await VerifyOtp(payload);
  
      if (res.statusCode === 200) {
        toast.success(res.message, {
          autoClose: 2000,
          position: "top-right",
        });
        navigate("/new-password", { state: { userIdentifier } });
      } else {
        toast.error(res.message || "OTP verification failed", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="shadow rounded w-100" style={{ maxWidth: "900px" }}>
        <Col md={6} className="d-none d-md-block bg-light p-0">
          <img src={Consultation1} alt="Visual" className="img-fluid p-4" />
        </Col>
        <Col
          xs={12}
          md={6}
          className="bg-white p-4 d-flex flex-column justify-content-center"
          style={{ borderRadius: "0 15px 15px 0" }}
        >
          <div className="text-center mb-4">
            <div className="d-flex align-items-center gap-3 mb-5">
              <img
                src="/layer.png"
                alt="Reset Visual"
                className="img-fluid"
                style={{ width: "40px", height: "40px" }}
              />
              <h4 className="fw-bold m-0">Balaji Ortho Care</h4>
            </div>
            <h5 className="fw-bold mt-2 text-start">Verify Otp</h5>
            <p className="text-start">
              Enter Email/Phone No & password to reset password
            </p>
          </div>

          <Form onSubmit={handleVerify}>
            <Form.Control
              type="text"
              value={userIdentifier}
              disabled
              className="mb-3"
            />
            <div className="d-flex justify-content-between mb-3">
              {otp.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="form-control text-center mx-1"
                  style={{ width: "45px", fontSize: "20px" }}
                  required
                />
              ))}
            </div>

            <Button type="submit" className="w-100 mb-3" variant="primary">
              Verify OTP
            </Button>

            <div className="text-center">
              <Link
                to="/reset-password"
                className="d-block text-center forgot-password-link"
              >
                Back to Reset Password
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyOtpPage;
