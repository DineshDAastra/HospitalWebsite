import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FiArrowUpRight } from "react-icons/fi";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import Joint from "../../../../src/assets/img/09.svg.svg";
import Sports from "../../../../src/assets/img/10.svg fill.svg";
import Fracture from "../../../../src/assets/img/11.svg.svg";
import Spine from "../../../../src/assets/img/13.svg fill.svg";
import Arthritis from "../../../../src/assets/img/14.svg.svg";
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
const Home = () => {
  const services = [
    {
      id: 1,
      title: "Joint Replacement Surgery",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: <img src={Joint} alt="Banner Image" />,
    },
    {
      id: 2,
      title: "Sports Injury Treatment",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: <img src={Sports} alt="Banner Image" />,
    },
  ];
  const services1 = [
    {
      id: 3,
      icon: <img src={Fracture} alt="Banner Image" />,
      title: "Fracture & Trauma Care",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 4,
      icon: <img src={Spine} alt="Banner Image" />,
      title: "Spine & Back Care",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 5,
      icon: <img src={Arthritis} alt="Banner Image" />,
      title: "Arthritis & Pain Management",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 6,
      icon: <img src={Pediatric} alt="Banner Image" />,
      title: "Pediatric Orthopedics",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
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
  const testimonials = [
    {
      id: 1,
      name: "David Patel",
      text: "Dr. Robert Thompson is an exceptional cardiologist. His ability to explain complex medical issues in an easy way is impressive.",
      image: David,
      rating: 5,
    },
    {
      id: 2,
      name: "David Patel",
      text: "Dr. Robert Thompson is an exceptional cardiologist. His ability to explain complex medical issues in an easy way is impressive.",
      image: David1,
      rating: 5,
    },
    {
      id: 3,
      name: "David Patel",
      text: "Dr. Robert Thompson is an exceptional cardiologist. His ability to explain complex medical issues in an easy way is impressive.",
      image: David2,
      rating: 5,
    },
  ];
  //   const contactDetails = [
  //     {
  //       id: 1,
  //       icon: <img src="/src/assets/img/Frame.svg"/>,
  //       text: "Aastra Technologies, Tiruvanchey, Chennai.",
  //     },
  //     {
  //       id: 2,
  //       icon: <img src="/src/assets/img/Frame (1).svg"/>,
  //       text: "+44 20 4154 2541\n+44 20 4154 2541",
  //     },
  //     {
  //       id: 3,
  //       icon:<img src= "/src/assets/img/Frame (2).svg"/>,
  //       text: "Mon-Fri: 9 AM – 6 PM\nSaturday: 9 AM – 4 PM",
  //     },
  //   ];
  const TestimonialCard = ({ testimonial }) => {
    return (
      <div className="col-md-4 mb-4">
        <div
          className="card p-4  border-0"
          style={{
            backgroundImage: `url(${Frame})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <FaQuoteLeft
            className="position-absolute"
            style={{
              color: "#6c63ff",
              fontSize: "24px",
              top: "20px",
              left: "20px",
            }}
          />
 
          <p className="text-muted mt-4">{testimonial.text}</p>
 
          <div className="d-flex align-items-center mt-3">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="rounded-circle me-3"
              width="50"
              height="50"
            />
            <div>
              <h5 className="mb-1 fw-bold">{testimonial.name}</h5>
              <div className="text-warning">
                {Array.from({ length: testimonial.rating }, (_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {/* Section 1 */}
      <div className="container-fluid">
        <img
          src={Banner}
          alt="Banner Image"
          className="image"
        />
        <div className="text-overlay">
          <div className="health-banner">
            <div className="icon-circle">
              <img
                src={doctor}
                alt="Health Icon"
              />
            </div>
            <span className="health-text">Strong Bones, Active Life</span>
          </div>
          <h1>Stronger Joints, Better Living</h1>
          <p>
            Comprehensive orthopedic solutions for bone, joint, and muscle
            health—keeping you active at every stage of life.
          </p>
          <a href="#" className="button">
            Appointment →
          </a>
        </div>
      </div>
 
      {/*  Section 2 */}
      <div className="container mb-3 mt-3">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src={Orthopedic}
              alt="Orthopedic Care"
              className="img-fluid rounded-3"
            />
          </div>
          <div className="col-md-6 mt-5">
            <button className="custom-button">About Us</button>
            <h2 className="fw-bold">
              Providing Exceptional Orthopedic Care with a Focus on Patients
            </h2>
            <p>
              At [Clinic Name], we are dedicated to delivering expert orthopedic
              care to help patients regain mobility and live pain-free.
            </p>
            <ul className="list-unstyled">
              <li className="d-flex align-items-start feature-item">
                <div className="icon-container">
                  <img
                    src={Icon}
                    className="icon-img"
                    alt="Icon"
                  />
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
                  <img
                    src={Icon}
                    className="icon-img"
                    alt="Icon"
                  />
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
                  <img
                    src={Icon}
                    className="icon-img"
                    alt="Icon"
                  />
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
      <div>
        <section className="services-section">
          <Container>
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
          </Container>
        </section>
      </div>
 
      {/* Section 4 */}
      <div>
        <section className="trust-section">
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
      <div>
        <section className="services-section py-3">
          <Container>
            <div className="container text-center">
              <button className="custom-button">Other Hospitals</button>
              <h2 className="fw-bold">Hospital Branch</h2>
 
              <div className="row mt-4">
                {hospitals.map((hospital) => (
                  <div key={hospital.id} className="col-md-4 col-sm-6 mb-4">
                    <div className="card hospital-card shadow-sm">
                      <img
                        src={hospital.icon}
                        alt={hospital.name}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{hospital.name}</h5>
                        <hr className="custom-divider" />
                        <div className="row">
                          <div className="col-6 d-flex align-items-center">
                            <img
                              src={Location}
                              alt="Location"
                              className="location-icon me-1"
                            />
                            <span className="address-text">
                              {hospital.address}
                            </span>
                          </div>
                          <div className="col-6 text-end">
                            <span className="review-text">
                              {hospital.reviews} Review
                            </span>
                            <div className="stars">
                              {"★".repeat(hospital.rating)}
                              {"☆".repeat(5 - hospital.rating)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="carousel-indicators mt-4">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </Container>
        </section>
      </div>
 
      {/* Section 6 */}
      <div>
        <section>
          <Container fluid className="consulting-container">
            <Row className="align-items-center">
              <Col md={6} className="image-section">
                <img
                  src={Consultation}
                  alt="Doctor Consultation"
                  className="doctor-image"
                />
                <div className="form-overlay">
                  <h2>Book your Free Consulting</h2>
                  <Form>
                    <Form.Group>
                      <Form.Control type="text" placeholder="Patient Name" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control type="text" placeholder="Phone Number" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control type="date" placeholder="mm/dd/yyyy" />
                    </Form.Group>
                    <Form.Group className="custom-dropdown">
                      <Form.Select>
                        <option>Select Doctor Time</option>
                        <option>10:00 AM - 11:00 AM</option>
                        <option>11:00 AM - 12:00 PM</option>
                      </Form.Select>
                    </Form.Group>
                    <Button className="appointment-btn">
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
      <div>
        <section>
          <div
            className="container-fluid text-center py-3"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              borderRadius: "15px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <button className="custom-button">Client Feedback</button>
            <h2 className="mb-4 fw-bold">Words from Our Patients</h2>
            <div className="container">
              <div className="row">
                {testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
 
      {/* Section 8 */}
      <div>
        <section>
          <div className="container text-center mt-3">
            <button className="custom-button">Client Feedback</button>
            <h2 className="fw-bold">
              General Contact <span className="text-primary">Information</span>
            </h2>
            <div className="row mt-4">
              <div className="col-sm-4">
                <div className="contact-card">
                  <img src={Contact}/>
                  <p className="contact">Aastra Technologies,<br></br>
                   Tiruvanchey, Chennai.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="contact-card">
                <img src={Contact1} />
                  <p className="contact">+44 20 4154 2541<br></br>
                  +44 20 4154 2541</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="contact-card">
                <img src={Contact2} />
                  <p className="contact">Mon-Fri: 9 AM - 6 PM
                    <br></br>
                  Saturday: 9 AM - 4 PM</p>
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