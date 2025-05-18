import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import PriceRange from './PriceRange/PriceRange';
import RoomAndBeds from './RoomAndBeds/RoomAndBeds';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllFilterThunk } from '../../services/Slice/Filter/AllFillter';

const FilterCategory = (props) => {
  const navigate = useNavigate();
  const Hotels = useSelector((state) => state.GetAllFilter.AllFilter);
  const dispatch=useDispatch()
  const [priceRange, setPriceRange] = useState({ minPrice: 10, maxPrice:570 });
  const [roomAndBed, setRoomAndBed] = useState({
    rooms: '',
    beds: '',
    bathrooms: '',
  });
  
  const handelFilter = () => {
    const allFilters = {
      minPrice: priceRange.minPrice,
      maxPrice: priceRange.maxPrice,
      rooms: roomAndBed.rooms,
      pets: roomAndBed.beds,
      path: roomAndBed.bathrooms,
      // ممكن تضيف فلاتر تانية هنا
    };
    console.log("جاري إرسال الفلاتر:", allFilters);
    dispatch(GetAllFilterThunk(allFilters));

    navigate('/Filter');
  };

  // Function to stop event propagation
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"  // Prevents closing the modal by clicking outside
      keyboard={false}   // Prevents closing the modal by pressing Escape
    >
      <div onClick={handleModalClick}>
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="w-100 fs-6 text-center"
          >
           Filter
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container fluid>
            <Row>
              {/* 🏠 Type of place */}
              <Col xs={12} className="mb-4">
                <label>Type of place</label>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <button className="btn btn-light flex-fill" style={{ fontSize: '12px' }}>
                    Any type
                  </button>
                  <button className="btn btn-light flex-fill" style={{ fontSize: '12px' }}>
                    Room
                  </button>
                  <button className="btn btn-light flex-fill" style={{ fontSize: '12px' }}>
                    Entire home
                  </button>
                </div>
              </Col>

              <Col xs={12} className="mb-4 border-top pt-3">
                <label>Price range</label>
                <p className="text-muted mb-2" style={{ fontSize: '13px' }}>
                  Nightly prices before fees and taxes
                </p>
                <PriceRange priceRange={priceRange} setPriceRange={setPriceRange} />
              </Col>

              <Col xs={12} className="mb-3 border-top">
                <RoomAndBeds roomAndBed={roomAndBed} setRoomAndBed={setRoomAndBed} />
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex justify-content-between w-100 flex-wrap gap-2">
            <Button
              onClick={props.onHide}
              className="bg-light text-dark border-0 flex-fill"
            >
              Close
            </Button>

            <Button
              className="bg-dark border-0 flex-fill fs-6"
              onClick={handelFilter}
            >
               Show Rooms 
            </Button>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default FilterCategory;