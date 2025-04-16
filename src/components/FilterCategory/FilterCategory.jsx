import React from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import PriceRange from './PriceRange/PriceRange';
import RoomAndBeds from './RoomAndBeds/RoomAndBeds';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FilterCategory = (props) => {

  const FilteredRooms = useSelector((state) => state.FilterByPrice.Filter);
  const filteredCount = FilteredRooms?.length || 0;
  const isLoading = useSelector((load) => load.FilterByPrice.isLoading)
  const navigate = useNavigate();

  const handelFilter = () => {
    props.onHide()
    navigate('/Filter')
  }
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="w-100 fs-6 text-center"
        >
          Filters
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
              <PriceRange />
            </Col>

            <Col xs={12} className="mb-3 border-top">
              <RoomAndBeds />
            </Col>
          </Row>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <div className="d-flex justify-content-between w-100 flex-wrap gap-2">
          <Button onClick={props.onHide} className="bg-light text-dark border-0 flex-fill">
            Close
          </Button>

          <Button
            className="bg-dark border-0 flex-fill fs-6"
            onClick={handelFilter}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Loading...
              </>
            ) : (
              `Show rooms (${filteredCount})`
            )}
          </Button>

        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterCategory;
