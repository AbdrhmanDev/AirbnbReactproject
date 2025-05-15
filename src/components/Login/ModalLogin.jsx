import React, { useEffect, useState } from 'react'
import { Modal, Container, Form, Button } from 'react-bootstrap';
import LoginWithGoogle from './LoginwithGoogle';
import { emitter } from '../../features/emitter';
import LoginWithPhone from './LoginWithPhone';
const ModalLogin = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    emitter.on('open-modal', () => setIsOpen(true));
    emitter.on('close-modal', () => setIsOpen(false));

    return () => {
      emitter.off('open-modal');
      emitter.off('close-modal');
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
    <Modal {...props} onHide={handleClose}
    show={isOpen}
    aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className='text-center fs-6 w-100'>
        Log in or sign up
        </Modal.Title>
      </Modal.Header>
    
        <Modal.Body >
          <Container >
            <div className="p-3 w-100" >
              <h3 className="h4 mb-4">Welcome to Airbnb</h3>
              <section>
               <div className='w-100'>
               <LoginWithPhone/>
               </div>
                <div className="d-flex align-items-center text-muted small">
                  <div className="flex-grow-1 border-top"></div>
                  <span className="mx-2">or</span>
                  <div className="flex-grow-1 border-top"></div>
                </div>
                 <div >
                 <LoginWithGoogle />
                 </div>
              </section>
            </div>
          </Container>
        </Modal.Body>
    </Modal>
    </>
  )
}

export default ModalLogin