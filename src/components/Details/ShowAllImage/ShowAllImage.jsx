import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Modal } from 'react-bootstrap';
import { IoIosArrowBack } from "react-icons/io";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ShowAllImage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const images = location?.state?.images || [];

  const [showSlider, setShowSlider] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const handleImageClick = (index) => {
    setStartIndex(index);
    setShowSlider(true);
  };

  const settings = {
    initialSlide: startIndex,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="m-2">
        <h4 className="mt-3 text-center">Photo tour</h4>
        <IoIosArrowBack className='bg-light rounded-5' style={{ width: "40px", height: "35px" }} onClick={() => navigate(-1)} />
      </div>

      <Container className="my-3">
        <Row className="gx-3 gy-3">
          {images.length > 0 ? (
            images.map((item, index) => (
              <Col
                key={index}
                xs={6}
                sm={4}
                md={3}
                lg={2}
                className="d-flex justify-content-center"
              >
                <Image
                  src={item}
                  alt={`Image ${index}`}
                  style={{ width: "180px", height: "120px", objectFit: 'cover', borderRadius: "10px", cursor: "pointer" }}
                  rounded
                  onClick={() => handleImageClick(index)}
                />
              </Col>
            ))
          ) : (
            <p>No images to show.</p>
          )}
        </Row>
      </Container>

      <Modal show={showSlider} onHide={() => setShowSlider(false) } fullscreen>
        <Modal.Body className="m-0 p-0">
          <Slider {...settings}>
            
            {images.map((img, i) => (
              
              <div key={i}>
               <IoIosArrowBack className='bg-light rounded-5 position-relative ' style={{ width: "40px", height: "35px" }} onClick={() => navigate(-1)} />
                <img src={img} alt={`slide-${i}`} style={{width: "100%",height: "95vh",objectFit: "cover"}}/>
              </div>
            ))}
          </Slider>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowAllImage;
