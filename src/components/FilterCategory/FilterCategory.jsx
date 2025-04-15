import React from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import PriceRange from './PriceRange/PriceRange';
import RoomAndBeds from './RoomAndBeds/RoomAndBeds';

const FilterCategory = (props) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className='w-100 fs-6 text-center'>
          Filters
        </Modal.Title>
      </Modal.Header>


      <Modal.Body className="grid-example ">
        <Container>
          <Row className='w-100'>
            <Col xs={12} md={12} className=''>
            <label htmlFor="">Type of place</label>
            <div className=' border rounded-2 text-center mt-1 '>
            <button className='border-0  ps-4 pe-3 p-2 ' style={{fontSize:"12px",width:"33%"}}>Any type</button>
            <button className='border-0  ps-4 pe-3 p-2 ' style={{fontSize:"12px",width:"33%"}}>Room</button>
            <button className='border-0  ps-2 pe-2 p-2 ' style={{fontSize:"12px",width:"34%"}}>Entire home</button>
            </div>
            </Col>
            <Col className='mt-4 border-top'>
            <label htmlFor="">Price range</label>
            <p>Nightly prices before fees and taxes</p>
            <div >
            <PriceRange/>

            </div>
            </Col>
            <Col>
            <div>
              <RoomAndBeds/>
            </div>
            </Col>
          </Row>
          
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <div className='d-flex justify-content-between w-100'>
        <Button onClick={props.onHide} className='bg-light text-dark border-0'>Close</Button>
        <Button className='bg-dark border-0'>show rooms</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterCategory;
