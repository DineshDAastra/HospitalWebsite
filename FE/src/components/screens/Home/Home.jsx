import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
import axios from "axios";
import client from "../../../client/Client";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { FiArrowUpRight } from "react-icons/fi";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Joint from "../../../../src/assets/img/09.svg.svg";
import Sports from "../../../../src/assets/img/10.svg fill.svg";
import Fracture from "../../../../src/assets/img/11.svg.svg";
import Spine from "../../../../src/assets/img/13.svg fill.svg";
import Arthritis from "../../../../src/assets/img/14.svg (1).svg";
import Pediatric from "../../../../src/assets/img/12.svg fill.svg";
import Evergreen from "../../../../src/assets/img/02.jpg.svg";
import Hopewell from "../../../../src/assets/img/03.jpg.svg";
import Services from "../../../../src/assets/img/04.jpg.svg";
import David from "../../../../src/assets/img/Ellipse 2.svg";
import David1 from "../../../../src/assets/img/Ellipse 2 (1).svg";
import David2 from "../../../../src/assets/img/Ellipse 2 (2).svg";
import Frame from "../../../../src/assets/img/Frame 37.svg";
import Banner from "../../../../src/assets/img/1111 1.svg";
import doctor from "../../../../src/assets/img/doctor-01-stroke-rounded 1.svg";
import Orthopedic from "../../../../src/assets/img/image.svg";
import Icon from "../../../../src/assets/img/12.svg.svg";
import Location from "../../../../src/assets/img/Icon.svg";
import Consultation from "../../../../src/assets/img/Frame 61 (2).svg";
import Consultation1 from "../../../../src/assets/img/image 2.svg";
import Contact from "../../../../src/assets/img/Frame.svg";
import Contact1 from "../../../../src/assets/img/Frame (1).svg";
import Contact2 from "../../../../src/assets/img/Frame (2).svg";
import Group from "../../../../src/assets/img/Group.svg";
import Group1 from "../../../../src/assets/img/Group (1).svg";
import Group2 from "../../../../src/assets/img/Group (2).svg";
import { addAppointment, addReview } from "../../../client/Api/AppoinmentApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFileDownload } from "react-icons/fa";
import { Document } from "react-pdf";
const Home = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    gender: "",
    age: "",
    phoneNumber: "",
    reason: "",
    date: "",
    availableTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addAppointment(formData);
    if (response.statusCode === 200) {
      setFormData({
        patientName: "",
        gender: "",
        age: "",
        phoneNumber: "",
        reason: "",
        date: "",
        availableTime: "",
      });
      toast.success(response.message, {
        autoClose: 2000,
        position: "top-right",
      });
    }
  };
  const exerciseCategories = [
    {
      id: 1,
      icon: <img src={Group} alt="Banner Image" />,
      title: "Hip Exercises",
      description:
        "Targeted exercises to strengthen hip muscles, improve flexibility, and enhance joint mobility.",
    },
    {
      id: 2,
      icon: <img src={Group1} alt="Banner Image" />,
      title: "Neck & Shoulder Exercises",
      description:
        "Gentle movements and stretches to relieve tension and improve posture for neck and shoulder health.",
    },
    {
      id: 3,
      icon: <img src={Arthritis} alt="Banner Image" />,
      title: "Knee Exercises",
      description:
        "Effective routines to build knee stability, reduce pain, and support injury recovery.",
    },
    {
      id: 4,
      icon: <img src={Group2} alt="Banner Image" />,
      title: "Back Exercises",
      description:
        "Core-strengthening and mobility workouts to support spinal alignment and reduce back discomfort.",
    },
  ];
  const services2 = [
    {
      title: "Expert Care",
      description:
        "Our experienced orthopedic specialists provide precise diagnosis and treatment.",
    },
    {
      title: "Advanced Technology",
      description:
        "We use state-of-the-art equipment for accurate and effective treatments.",
    },
    {
      title: "Proven Results",
      description:
        "Thousands of successful treatments with high patient satisfaction.",
    },
    {
      title: "Compassionate Support",
      description:
        "We prioritize patient comfort and well-being throughout their journey.",
    },
  ];
  const hospitals = [
    {
      id: 1,
      name: "Evergreen Health Services",
      icon: Evergreen,
      address: "123 Main Street, Hopewell, CA 90210",
      reviews: "2k Review",
      rating: 4,
    },
    {
      id: 2,
      name: "Hopewell General Hospital",
      icon: Hopewell,
      address: "123 Main Street, Hopewell, CA 90210",
      reviews: "2k Review",
      rating: 4,
    },
    {
      id: 3,
      name: "Evergreen Health Services",
      icon: Services,
      address: "123 Main Street, Hopewell, CA 90210",
      reviews: "2k Review",
      rating: 4,
    },
  ];
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const getAllReview = async () => {
    try {
      const response = await client("Review/GetAllReview", "GET");
      return response.data;
    } catch (error) {
      console.error("Error Fetching Review:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchReview = async () => {
      const response = await getAllReview();
      setReviews(response);
    };
    fetchReview();
  }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setName("");
    setDescription("");
    setRating(0);
  };

  const handledSubmit = async () => {
    if (!name.trim() || !description.trim() || rating === 0) {
      toast.error("Please fill all fields and select a rating!");
      return;
    }
    // if (name.length > 50) {
    //   toast.error("Name should not exceed 50 characters!");
    //   return;
    // }
    // if (description.length > 150) {
    //   toast.error("Description should not exceed 150 characters!");
    //   return;
    // }
    const ReviewData = { name, description, rating };
    try {
      const response = await addReview(ReviewData);

      if (response.statusCode === 200) {
        // toast.success("Feedback submitted successfully!");
        toast.success(response.message, {
          autoClose: 2000,
          position: "top-right",
        });
        handleCloseModal();

        const data = await getAllReview();
        setReviews(data.slice(0).reverse());
      } else {
        // toast.error("Failed to submit feedback.");
        toast.error(response.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Something went wrong!");
    }
  };
  const itemsPerSlide = isMobile ? 1 : 3;
  // const totalSlides = Math.ceil(reviews.length / itemsPerSlide);
  const totalSlides = Math.ceil((reviews?.length || 0) / itemsPerSlide);

  const slideIndexes = Array.from({ length: totalSlides }, (_, i) => i);

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const getReviewsForSlide = (slideIndex) => {
    const startIndex = slideIndex * itemsPerSlide;
    return reviews.slice(startIndex, startIndex + itemsPerSlide);
  };

  const styles = {
    container: {
      backgroundColor: "#f8f9fa",
      padding: "60px 0",
      position: "relative",
      overflow: "hidden",
    },
    testimonialCard: {
      backgroundColor: "#f0f7ff",
      borderRadius: "10px",
      height: "100%",
      position: "relative",
      textAlign: "left",
      padding: "25px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    },
    quoteIcon: {
      color: "#4169e1",
      fontSize: "32px",
      marginBottom: "15px",
    },
    testimonialText: {
      fontSize: "15px",
      lineHeight: "1.6",
      marginBottom: "20px",
    },
    authorName: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "2px",
    },
    starRating: {
      color: "#FFD700",
      fontSize: "14px",
    },
    paginationDot: {
      width: "10px",
      height: "10px",
      border: "none",
      display: "inline-block",
      margin: "0 5px",
      borderRadius: "50%",
      cursor: "pointer",
    },
    activeDot: {
      backgroundColor: "#4169e1",
    },
    inactiveDot: {
      backgroundColor: "#cbd3e1",
      opacity: "0.5",
    },
    navArrow: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "40px",
      height: "40px",
      display: isMobile ? "none" : "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: "50%",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      border: "none",
      cursor: "pointer",
      zIndex: 10,
      color: "#4169e1",
    },
    prevArrow: {
      left: "-20px",
    },
    nextArrow: {
      right: "-20px",
    },
  };

  return (
    <>
      {/* Section 1 */}
      <div id="home" className="container-fluid">
        <img src={Banner} alt="Banner Image" className="image" />
        <div className="text-overlay">
          <div className="health-banner">
            <div className="icon-circle">
              <img src={doctor} alt="Health Icon" />
            </div>
            <span className="health-text">Strong Bones, Active Life</span>
          </div>
          <h1>Stronger Joints, Better Living</h1>
          <p>
            Comprehensive orthopedic solutions for bone, joint, and muscle
            health—keeping you active at every stage of life.
          </p>
          <a
            href="#"
            className="button"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact-form")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Appointment →
          </a>
        </div>
      </div>

      {/*  Section 2 */}
      <div className="container mb-3 mt-3" id="about">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src={Orthopedic}
              alt="Orthopedic Care"
              className="img-fluid images rounded-3"
            />
          </div>
          <div className="col-md-6 mt-5">
            <button className="custom-button">About Us</button>
            <h2 className="fw-bold">
              Providing Exceptional Orthopedic Care with a Focus on Patients
            </h2>
            <p>
              At Balaji Ortho Care, we are dedicated to delivering expert
              orthopedic care to help patients regain mobility and live
              pain-free.
            </p>
            <ul className="list-unstyled">
              <li className="d-flex align-items-start feature-item">
                <div className="icon-container">
                  <img src={Icon} className="icon-img" alt="Icon" />
                </div>
                <div>
                  <strong>Patient-Centered Care</strong>
                  <p>
                    Compassionate, personalized treatment plans tailored to your
                    needs.
                  </p>
                </div>
              </li>

              <li className="d-flex align-items-start feature-item">
                <div className="icon-container">
                  <img src={Icon} className="icon-img" alt="Icon" />
                </div>
                <div>
                  <strong>Advanced Techniques</strong>
                  <p>
                    Minimally invasive procedures for faster recovery and better
                    outcomes.
                  </p>
                </div>
              </li>

              <li className="d-flex align-items-start feature-item">
                <div className="icon-container">
                  <img src={Icon} className="icon-img" alt="Icon" />
                </div>
                <div>
                  <strong>Comprehensive Expertise</strong>
                  <p>
                    From joint replacements to pediatric orthopedics, we cover
                    all aspects of bone and joint health.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div
        id="service"
        style={{ backgroundColor: "#F0F7FF", padding: "60px 0" }}
      >
        <Container>
          <div className="text-center mb-5">
            <div className="mb-4">
              <button className="custom-button"> Therapeutic Exercises</button>
            </div>
            <h2 className="display-5 fw-bold mb-3" style={{ fontSize: "36px" }}>
              Empowering Recovery Through Targeted
              <br />
              Therapeutic Exercises
            </h2>
            <p
              className="text-muted mx-auto"
              style={{ maxWidth: "800px", fontSize: "16px", lineHeight: "1.6" }}
            >
              Our physiotherapy team specializes in guided exercise programs
              designed to improve mobility, reduce pain, and restore strength—
              supporting your recovery journey from injury to full function.
            </p>
          </div>

          <Row className="g-4">
            {exerciseCategories.map((category) => (
              <Col key={category.id} xs={12} sm={6} lg={3}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="mb-4">{category.icon}</div>
                    <h3 className="fw-bold mb-2" style={{ fontSize: "20px" , minHeight: "48px" }}>
                      {category.title}
                    </h3>
                    <p className="text-muted mb-4" style={{ fontSize: "14px" , lineHeight: "1.5", minHeight: "60px"}}>
                      {category.description}
                    </p>
                    <div className="mt-3">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                          window.open("/filepath/Document.pdf", "_blanck");
                        }}
                      >
                        <span className="me-2" style={{ color: "#DC3545" }}>
                          <FaFileDownload />
                        </span>
                        Download
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      {/* <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <div className="mb-4">
                  <button className="custom-button">Our services</button>
                </div>
                <h2 className="display-5 fw-bold mb-4">
                  We provide expert orthopedic care for a pain-free, active
                  life.
                </h2>
                <p className="text-muted">
                  Our specialized team offers advanced treatments for joint
                  pain, fractures, spine issues, and sports injuries using the
                  latest techniques to ensure faster recovery and lasting
                  relief.
                </p>
              </Col>
              <Col md={6}>
                <Row className="g-4">
                  {services.map((service) => (
                    <Col key={service.id} sm={6} xs={12}>
                      <Card className="service-card border-0 shadow-sm">
                        <Card.Body className="p-4">
                          <div className="icon-box mb-4">{service.icon}</div>
                          <h3 className="h5 fw-bold mb-3">{service.title}</h3>
                          <p className="text-muted mb-0">
                            {service.description}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="g-4 mt-3">
              <Col md={6}>
                <Row className="g-4">
                  {services1.slice(0, 2).map((service1) => (
                    <Col key={service1.id} md={6}>
                      <Card className="service-card  border-0 shadow-sm">
                        <Card.Body className="p-4">
                          <div className="icon-box mb-3">{service1.icon}</div>
                          <h3 className="h5 fw-bold">{service1.title}</h3>
                          <p className="text-muted">{service1.description}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col md={6}>
                <Row className="g-4">
                  {services1.slice(2, 4).map((service1) => (
                    <Col key={service1.id} md={6}>
                      <Card className="service-card  border-0 shadow-sm">
                        <Card.Body className="p-4">
                          <div className="icon-box mb-3">{service1.icon}</div>
                          <h3 className="h5 fw-bold">{service1.title}</h3>
                          <p className="text-muted">{service1.description}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container> */}
      {/* </section>
      </div> */}

      {/* Section 4 */}
      <div>
        <section className="trust-section" id="whychooseus">
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
                <button className="custom-button">Why Choose Us</button>
                <h2 className="fw-bold mt-3">Why Patients Trust Us?</h2>
                <p className="text-muted">
                  We are committed to delivering exceptional orthopedic care
                  with expertise, innovation, and a patient-first approach.
                </p>
                <Row className="g-3">
                  {services2.map((service, index) => (
                    <Col key={index} xs={12} sm={6}>
                      <Card className="info-card">
                        <h5 className="fw-bold">{service.title}</h5>
                        <p className="text-muted mb-0">{service.description}</p>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col md={6} className="text-center">
                <img
                  src={Orthopedic}
                  alt="Orthopedic Care"
                  className="img-fluid trust-image"
                />
              </Col>
            </Row>
          </Container>
        </section>
      </div>

      {/* Section 5 */}

      {/* Section 6 */}
      <div id="contact-form">
        <section>
          <Container fluid className="consulting-container">
            <Row className="align-items-center">
              <Col md={6} className="image-section">
                <img
                  src={Consultation}
                  alt="Doctor Consultation"
                  className="doctor-image1"
                />
                <div className="form-overlay">
                  <h2>Book your Free Consulting</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="patientName"
                        placeholder="Patient Name"
                        value={formData.patientName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="custom-dropdown">
                      <Form.Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Others">Others</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Control
                      as="textarea"
                      name="reason"
                      placeholder="Reason for Consultation"
                      value={formData.reason}
                      onChange={handleChange}
                      rows={3}
                      required
                      className="responsive-textarea"
                    />

                    <Form.Group>
                      <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="custom-dropdown">
                      <Form.Select
                        name="availableTime"
                        value={formData.availableTime}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Doctor Time</option>
                        <option value="10:00 AM - 11:00 AM">
                          10:00 AM - 11:00 AM
                        </option>
                        <option value="11:00 AM - 12:00 PM">
                          11:00 AM - 12:00 PM
                        </option>
                      </Form.Select>
                    </Form.Group>

                    <Button type="submit" className="appointment-btn">
                      Appointment <FiArrowUpRight className="arrow-icon" />
                    </Button>
                  </Form>
                </div>
              </Col>
              <Col md={6} className="image-section">
                <img
                  src={Consultation1}
                  alt="Doctor Consultation"
                  className="doctor-image"
                />
              </Col>
            </Row>
          </Container>
        </section>
      </div>

      {/* Section 7 */}
      <div id="testimonial" style={styles.container}>
        <div className="container text-center">
          <button className="custom-button" onClick={handleOpenModal}>
            Client Feedback
          </button>
          <h2 className="mb-5 fw-bold">Words from Our Patients</h2>

          {reviews && reviews.length > 0 ? (
            <div className="testimonial-carousel position-relative">
              {/* Testimonials */}
              <div className="carousel-inner">
                <div className="row">
                  {getReviewsForSlide(activeSlide).map((review, index) => (
                    <div
                      className={isMobile ? "col-12" : "col-md-4"}
                      key={review.id || index}
                    >
                      <div style={styles.testimonialCard}>
                        <FaQuoteLeft style={styles.quoteIcon} />
                        <p style={styles.testimonialText}>
                          {review.description ||
                            "Dr. Robert Thompson is an exceptional cardiologist. His ability to explain with complex medical issues in a way that's easy to understand is truly impressive."}
                        </p>
                        <div className="d-flex align-items-center">
                          <img
                            src={review.image || David}
                            alt={review.name || "David Patel"}
                            className="rounded-circle me-3"
                            width="50"
                            height="50"
                            style={{ objectFit: "cover" }}
                          />
                          <div>
                            <h5 style={styles.authorName}>
                              {review.name || "David Patel"}
                            </h5>
                            <div style={styles.starRating}>
                              {Array.from(
                                { length: review.rating || 5 },
                                (_, i) => (
                                  <FaStar key={i} />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="carousel-indicators position-relative mt-4">
                {slideIndexes.map((index) => (
                  <button
                    key={index}
                    type="button"
                    style={{
                      ...styles.paginationDot,
                      ...(activeSlide === index
                        ? styles.activeDot
                        : styles.inactiveDot),
                    }}
                    onClick={() => goToSlide(index)}
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                ))}
              </div>
              {totalSlides > 1 && (
                <>
                  <button
                    style={{ ...styles.navArrow, ...styles.prevArrow }}
                    onClick={() =>
                      goToSlide(
                        activeSlide > 0 ? activeSlide - 1 : totalSlides - 1
                      )
                    }
                    aria-label="Previous"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    style={{ ...styles.navArrow, ...styles.nextArrow }}
                    onClick={() =>
                      goToSlide(
                        activeSlide < totalSlides - 1 ? activeSlide + 1 : 0
                      )
                    }
                    aria-label="Next"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
          ) : (
            <p>No reviews yet. Be the first to share your experience!</p>
          )}
        </div>
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Client Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group mb-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength="50"
                />
              </div>

              <div className="form-group mb-3">
                <textarea
                  placeholder="Description"
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength="150"
                ></textarea>
              </div>

              <div className="form-group mb-3 text-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={30}
                    color={star <= rating ? "gold" : "gray"}
                    style={{ cursor: "pointer" }}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handledSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* Section 8 */}
      <div>
        <section>
          <div className="container text-center mt-3 mb-3">
            <button className="custom-button">Contact Information</button>
            <h2 className="fw-bold">
              General Contact <span className="text-primary">Information</span>
            </h2>
            <div className="row mt-4">
              {/* <div className="col-md-4 d-flex">
                <div className="contact-card text-center h-100 w-100">
                  
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.882862861453!2d80.21592077470983!3d13.003044287319105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5263d3ec633b81%3A0x3b304b89419cf7b1!2s79%2C%20Vetri%20Vinayagar%20Koil%20St%2C%20Tiruvalleeswarar%20Nagar%2C%20Anna%20Nagar%20West%2C%20Chennai%2C%20Tamil%20Nadu%20600040!5e0!3m2!1sen!2sin!4v1713348352231!5m2!1sen!2sin"
                    width="100%"
                    height="50"
                    style={{ border: 0, borderRadius: "10px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <a
                    href="https://maps.app.goo.gl/qzT9fD24woh5oNWi6"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p>
                      79, Vetri Vinayagar, Koil St, Tiruvalleeswarar Nagar, Anna
                      Nagar West, Chennai, Tamil Nadu 600040
                    </p>
                  </a>
                </div>
              </div> */}
              <div className="col-md-4 d-flex">
                <div className="contact-card text-center h-100 w-100">
                  <a
                    href="https://maps.app.goo.gl/qzT9fD24woh5oNWi6"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      width: "100%",
                      textDecoration: "none",
                    }}
                  >
                    <iframe
                      title="Google Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.882862861453!2d80.21592077470983!3d13.003044287319105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5263d3ec633b81%3A0x3b304b89419cf7b1!2s79%2C%20Vetri%20Vinayagar%20Koil%20St%2C%20Tiruvalleeswarar%20Nagar%2C%20Anna%20Nagar%20West%2C%20Chennai%2C%20Tamil%20Nadu%20600040!5e0!3m2!1sen!2sin!4v1713348352231!5m2!1sen!2sin"
                      width="100%"
                      height="50"
                      style={{
                        border: 0,
                        pointerEvents: "none",
                        borderRadius: "10px",
                      }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <p className="mt-3" style={{ color: "" }}>
                      79, Vetri Vinayagar, Koil St, Tiruvalleeswarar Nagar, Anna
                      Nagar West, Chennai, Tamil Nadu 600040
                    </p>
                  </a>
                </div>
              </div>

              <div className="col-md-4 d-flex">
                <div className="contact-card text-center h-100 w-100">
                  <img src={Contact1} alt="Phone" />
                  <p>+09710495064</p>
                </div>
              </div>

              <div className="col-md-4 d-flex">
                <div className="contact-card text-center h-100 w-100">
                  <img src={Contact2} alt="Timing" />
                  <p>Mon - Sun: 5 - 9PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
