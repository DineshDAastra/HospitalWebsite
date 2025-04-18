import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Consultation1 from "../../../../src/assets/img/image 2.svg";
import { Link } from "react-router-dom";
import { ResetPassword } from "../../../client/Api/AppoinmentApi";
import { toast } from "react-toastify";
const ResetPasswordPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const navigate = useNavigate();

//   const handleReset = async (e) => {
//     e.preventDefault();

//     try {
//       const payload = { userIdentifier: emailOrPhone };
//       const res = await ResetPassword(payload);

//       if (res.statusCode === 200) {
//         toast.success(response.message, {
//           autoClose: 2000,
//           position: "top-right",
//         });
//         navigate("/verify-otp", { state: { userIdentifier: emailOrPhone } });
//       } else {
//         toast.error(errorMessage, {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     } catch (err) {
//       console.error("Error resetting password:", err);
//     toast.error("An error occurred. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };
const handleReset = async (e) => {
    e.preventDefault();
  
    try {
      const payload = { userIdentifier: emailOrPhone };
      const res = await ResetPassword(payload);
  
      if (res.statusCode === 200) {
        toast.success(res.message, {
          autoClose: 2000,
          position: "top-right",
        });
        navigate("/verify-otp", { state: { userIdentifier: emailOrPhone } });
      } else {
        toast.error(res.message || "Something went wrong", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-75 shadow-lg rounded overflow-hidden">
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center bg-light"
        >
          <img src={Consultation1} alt="Visual" className="img-fluid p-4" />
        </Col>

        <Col
          xs={12}
          md={6}
          className="d-flex flex-column justify-content-center align-items-center p-5 bg-white"
        >
          <div className="w-100 text-start mb-5">
            <div className="d-flex align-items-center gap-3 mb-5">
              <img
                src="/layer.png"
                alt="Reset Visual"
                className="img-fluid"
                style={{ width: "40px", height: "40px" }}
              />
              <h4 className="fw-bold m-0">Balaji Ortho Care</h4>
            </div>

            <h3 className="mt-3 fw-bold text-start">Reset Password</h3>
            <p className="text-start">Enter Email/Phone No to receive OTP</p>
            <Form onSubmit={handleReset}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter your email address or phone"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" className="w-100 mb-3" variant="primary">
                Reset Password
              </Button>
              <Link
                to="/login"
                className="d-block text-center forgot-password-link"
              >
                Back to Login
              </Link>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordPage;
