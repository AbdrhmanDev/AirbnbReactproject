import React from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import {
  FaCamera,
  FaBriefcase,
  FaGlobe,
  FaSchool,
  FaPaw,
  FaMusic,
  FaMagic,
  FaClock
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  FaClock: FaClock,
  FaPaw: FaPaw,
  FaGlobe: FaGlobe,
  FaMusic: FaMusic,
  FaCamera: FaCamera,
  FaSchool:FaSchool,
  FaBriefcase:FaBriefcase,
  FaMagic:FaMagic
};

const ProfileAbout = ({ firstNameNew }) => {
  const navigate = useNavigate();
  const EditProfile = () => {
    navigate('/account/ProfileSection');
  };

  const getDataFavorite = localStorage.getItem('profileData');
  const getData = JSON.parse(getDataFavorite);
  const profileFields = getData?.profileFields || [];
  const interests = getData?.interests || [];

  return (
    <Container className="px-3 px-md-5 mt-4" style={{ maxWidth: '100%', padding: '0 1rem' }}>
      <div className="mx-auto" style={{ maxWidth: '100%', width: '100%' }}>
        <h3 className="fw-bold">About {firstNameNew}</h3>
        <Button variant="outline-dark" onClick={EditProfile} className="my-3 w-25">Edit profile</Button>

        <Row className="mb-4 mt-2">
          <div style={{ width: '100%', overflow: 'auto', wordBreak: 'break-word' }} className='mb-4'>
            {getData?.about}
          </div>

          <Row className="mt-2">
            {profileFields.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <Col xs={12} md={6} className="d-flex align-items-center mb-2" key={index}>
                  {Icon && <Icon className="me-2" />}
                  <span>{item.label}</span>
                </Col>
              );
            })}
          </Row>
        </Row>

        <hr />

        <h5 className="fw-bold mb-3 mt-4">Ask {firstNameNew} about</h5>
        <Row className="g-2">
          {interests.map((interest, index) => (
            <Col xs="auto" key={index}>
              <Badge bg="light" text="dark" className="p-2 rounded-pill">
                <span className="me-1">{interest.icon}</span> {interest.label}
              </Badge>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default ProfileAbout;
