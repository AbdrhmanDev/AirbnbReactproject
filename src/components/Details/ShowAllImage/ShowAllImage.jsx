import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
const ShowAllImage = ({images}) => {
    const [selectedSection, setSelectedSection] = useState(images);
  console.log(images);
  
    return (
      <Container className="py-5">
        <h4 className="mb-4">Photo tour</h4>
  
        <Row className="mb-5">
          {images.map((section) => (
            <Col
              xs={6}
              md={3}
              lg={2}
              className="mb-4 text-center"
              key={section.key}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedSection(section)}
            >
              <Image src={section.thumbnail} fluid rounded className="mb-2" />
              <div>{section.title}</div>
            </Col>
          ))}
        </Row>
  
        <div>
          <h5 className="mb-2">{selectedSection.title}</h5>
          {selectedSection.description && (
            <p className="text-muted">{selectedSection.description}</p>
          )}
  
          <Row>
            {selectedSection.images.map((img, index) => (
              <Col xs={12} md={6} lg={4} className="mb-4" key={index}>
                <Image src={img} fluid rounded />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    );
  };
  
  export default ShowAllImage;