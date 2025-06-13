import React, { useEffect, useState } from 'react'
import { Modal, Container, Form, Button } from 'react-bootstrap';
import LoginWithGoogle from './LoginWithGoogle';
import { emitter } from '../../features/emitter';
import LoginWithPhone from './LoginWithPhone';
import SignUpWithEmail from './SignUpwithEmail';
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";

const ModalLogin = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [CheckClick, setCheckClick] = useState(false)
  const [SignUpEmail, setSignUpEmail] = useState(false)
  useEffect(() => {
    emitter.on('open-modal', () => setIsOpen(true));
    emitter.on('close-modal', () => setIsOpen(false));

    return () => {
      emitter.off('open-modal');
      emitter.off('close-modal');
    };
  }, []);

  const handelSignup =()=>{
    setCheckClick(true)
    SignUpEmail(true)
  }

  const handleClose = () => {
    setIsOpen(false);
    setCheckClick(false)
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
              <div className='d-flex '>
                {
                CheckClick ?
              <IoIosArrowBack className='mb-4 me-3 mt-1' style={{ cursor: 'pointer' }} size={'25'} onClick={()=>setCheckClick(false)}/>
:''
              }
              <h3 className="h4 mb-4">Welcome to Airbnb</h3>
              </div>
              <section>
               <div className='w-100'>
                {
                  CheckClick ?'':<LoginWithPhone/>
                }
               </div>
               {
                !CheckClick ?
                 <div className="d-flex align-items-center text-muted small">
                  <div className="flex-grow-1 border-top"></div>
                  <span className="mx-2">or</span>
                  <div className="flex-grow-1 border-top"></div>
                </div> :""
               }
                 <div >
                 {
                  CheckClick ?'':<LoginWithGoogle />
                }
                 
                 </div>

                 <div className=' d-flex justify-content-center mt-3 '>
                  
                 <div className=''>
                  {
                   CheckClick ? 
                  <SignUpWithEmail setSignUpEmail={()=>setSignUpEmail(true)}/> :
                  <button onClick={handelSignup}
                    className=' rounded-1 border-1 bg-body p-2 py-2 px-5 '>
                      <span className='pe-4'>
                  <MdOutlineEmail size={'20'}/>
                      </span>
                  Login With Email
                  </button>
                  
                  }
                 </div>

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