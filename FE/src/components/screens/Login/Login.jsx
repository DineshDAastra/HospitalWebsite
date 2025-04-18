import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import Consultation1 from "../../../../src/assets/img/image 2.svg";
import { userLogin } from "../../../client/Api/AppoinmentApi";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const payload = {
  //       userName: email,
  //       password: password,
  //     };

  //     const response = await userLogin(payload);

  //     if (response && response.success) {
  //       localStorage.setItem("loggedin", "true");
  //       toast.success(response.message, {
  //         autoClose: 2000,
  //         position: "top-right",
  //       });

  //       navigate("/approved");
  //     } else {
  //       const errorMessage =
  //         response?.message || "Login failed. Please try again.";
  //       toast.error(errorMessage, {
  //         position: "top-right",
  //         autoClose: 3000,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     toast.error("Something went wrong. Please try again later.", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        userName: email,
        password: password,
      };

      const response = await userLogin(payload);

      if (response && response.success) {
        // Save login flag (and maybe token if needed)
        localStorage.setItem("loggedin", "true");

        toast.success(response.message || "Login successful", {
          autoClose: 2000,
          position: "top-right",
        });

        navigate("/approved");
      } else {
        toast.error(response?.message || "Login failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again later.", {
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
          <img
            src={Consultation1}
            alt="Login Visual"
            className="img-fluid p-4"
          />
        </Col>

        <Col
          xs={12}
          md={6}
          className="d-flex flex-column justify-content-center align-items-center p-5 bg-white"
        >
          <div className="w-100">
            <h2 className="text-center mb-4">Sign In</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address or Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your email address or phone"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 position-relative">
                <Form.Label>Password</Form.Label>
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ paddingRight: "45px" }}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      background: "#f1f1f1",
                      borderRadius: "5px",
                      padding: "5px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {showPassword ? (
                      <BsEyeSlash size={18} />
                    ) : (
                      <BsEye size={18} />
                    )}
                  </div>
                </div>
              </Form.Group>
              <div className="text-end mb-3">
                <Link to="/reset-password" className="forgot-password-link">
                  Forgot Password?
                </Link>
              </div>
              <Button variant="primary" type="submit" className="w-100">
                Sign In
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
