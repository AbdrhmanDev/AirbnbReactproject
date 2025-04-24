import React from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import {
  FaClock, FaHeart, FaGlobe,
  FaCoffee, FaUtensils, FaMusic,
  FaBinoculars, FaLandmark, FaCamera, FaSwimmer
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfileAbout = ({firstNameNew}) => {
    const navigate= useNavigate()
    const EditProfile =()=>{
        navigate('/account/ProfileSection')
    }
  return (
    <Container className="px-3 px-md-5 mt-4" style={{ maxWidth: '100%', padding: '0 1rem' }}>
      <div
        className="mx-auto"
        style={{
          maxWidth: '100%',
          width: '100%'
        }}
      >
        <h3 className="fw-bold">About {firstNameNew}</h3>
        <Button variant="outline-dark" onClick={EditProfile} className="my-3 w-25">Edit profile</Button>

        <Row className="mb-4 mt-4">
          <Col xs={12} md={6} className="d-flex align-items-center mb-2">
            <FaClock className="me-2" />
            <span>I spend too much time: dsasa</span>
          </Col>
          <Col xs={12} md={6} className="d-flex align-items-center mb-2">
            <FaHeart className="me-2" />
            <span>I’m obsessed with: sa</span>
          </Col>
          <Col xs={12} className="d-flex align-items-center">
            <FaGlobe className="me-2" />
            <span>Lives in Egypt, United Kingdom</span>
          </Col>
        </Row>

        <hr />

        <h5 className="fw-bold mb-3 mt-4">Ask {firstNameNew} about</h5>
        <Row className="g-2">
          <Col xs="auto"><Badge bg="light" text="dark" className="p-2 rounded-pill"><FaCoffee className="me-1" /> Coffee</Badge></Col>
          <Col xs="auto"><Badge bg="light" text="dark" className="p-2 rounded-pill"><FaUtensils className="me-1" /> Food</Badge></Col>
          <Col xs="auto"><Badge bg="light" text="dark" className="p-2 rounded-pill"><FaMusic className="me-1" /> Live music</Badge></Col>
          <Col xs="auto"><Badge bg="light" text="dark" className="p-2 rounded-pill"><FaBinoculars className="me-1" /> Local culture</Badge></Col>
          <Col xs="auto"><Badge bg="light" text="dark" className="p-2 rounded-pill"><FaLandmark className="me-1" /> Museums</Badge></Col>
          <Col xs="auto"><Badge bg="light" text="dark" className="p-2 rounded-pill"><FaCamera className="me-1" /> Photography</Badge></Col>
          <Col xs="auto"><Badge bg="light" text="dark" className="p-2 rounded-pill"><FaSwimmer className="me-1" /> Swimming</Badge></Col>
        </Row>
      </div>
    </Container>
  );
};

export default ProfileAbout;
