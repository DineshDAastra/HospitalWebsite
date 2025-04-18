import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ChangePassword } from "../../../client/Api/AppoinmentApi";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import Consultation1 from "../../../../src/assets/img/image 2.svg";
import { toast } from "react-toastify";

const NewPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userIdentifier = location.state?.userIdentifier;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

//   const handleResetPassword = async (e) => {
//     e.preventDefault();

//     if (!newPassword || !confirmPassword) {
//       toast("Both fields are required.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast("Passwords do not match.");
//       return;
//     }

//     try {
//       const payload = {
//         userIdentifier,
//         newPassword,
//         confirmPassword,
//       };

//       const response = await ChangePassword(payload);

//       if (response.statusCode === 200) {
//         toast.success(response.message, {
//           autoClose: 2000,
//           position: "top-right",
//         });
//         navigate("/login");
//       } else {
//         toast.error(errorMessage, {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       console.error("Password reset error:", error);
//      toast.error("Error occurred. Please try again.", {
//             position: "top-right",
//             autoClose: 3000,
//           });
//     }
//   };
const handleResetPassword = async (e) => {
    e.preventDefault();
  
    if (!newPassword || !confirmPassword) {
      toast.error("Both fields are required.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
  
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
  
    try {
      const payload = {
        userIdentifier,
        newPassword,
        confirmPassword,
      };
  
      const response = await ChangePassword(payload);
  
      if (response.statusCode === 200) {
        toast.success(response.message || "Password reset successful", {
          autoClose: 2000,
          position: "top-right",
        });
        navigate("/login");
      } else {
        toast.error(response.message || "Password reset failed", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="shadow rounded w-100" style={{ maxWidth: "900px" }}>
        <Col md={6} className="d-none d-md-block p-0">
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
            <h5 className="fw-bold mt-2 text-start">Reset Password</h5>
            <p className="text-start">
              Enter Email/Phone No & password to reset password
            </p>
          </div>

          <Form onSubmit={handleResetPassword}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={userIdentifier}
                disabled
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <InputGroup>
                <Form.Control
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeSlashFill /> : <EyeFill />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button type="submit" className="w-100 mb-3" variant="primary">
              Reset Password
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="d-block text-center forgot-password-link"
              >
                Back to Login
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewPasswordPage;
