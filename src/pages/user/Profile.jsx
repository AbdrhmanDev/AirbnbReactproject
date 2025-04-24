import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './Profile.module.css';

const ProfileCard = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  return (
    <>
      <div className="container-fluid w-75 mb-5">
        <div className="row">
          {/* left side */}
          <div className="flex-column col-6">
            <div className={`${style.custom_card} p-4 shadow-lg row w-25 ms-5 rounded-5`}>
              <div className="col-6 text-center align-content-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHUndSzxcF1UbSXX3bVILVaUbSIhoc_GEA8g&s"
                  onClick={handleOpen}
                  className={style.userImg2}
                  alt=""
                />
                <h4 className="fw-bold mt-3 mb-1">Ahmed</h4>
                <p className="text-muted">Guest</p>
              </div>
              <div className="col-6 d-flex flex-column justify-content-center">
                <h4 className="fw-bold">2</h4>
                <small className={`${style.changSize} text-muted m-0`}>Months on Airbnb</small>
              </div>
            </div>

            <div className={`${style.card} p-4 ms-5 mt-3`}>
              <h5 className="fw-bold mb-4">Ahmed's confirmed information</h5>

              <div className="mb-2 d-flex align-items-center">
                <span className={style.checkmark}>✓</span>
                <span className="ms-2">Email address</span>
              </div>

              <div className="mb-4 d-flex align-items-center">
                <span className={style.checkmark}>✓</span>
                <span className="ms-2">Phone number</span>
              </div>

              <hr />

              <h5 className="fw-bold mt-4 mb-2">Verify your identity</h5>
              <p className="text-muted mb-4">
                Before you book or host on Airbnb, you’ll need to complete this step.
              </p>

              <button className="btn btn-outline-dark rounded-3 fw-semibold">Get verified</button>
            </div>
          </div>
          {/* left side */}
          <div className="ms-5 mt-5 pt-4 col-6" style={{ maxWidth: '300px' }}>
            <hr />
            <p className="fw-bold mt-4 mb-2">It's time to create your profile</p>
            <p className="text-muted mb-4">
              Your Airbnb profile is an important part of every reservation. Create yours to help
              other Hosts and guests get to know you.
            </p>
            <button className={`${style.buttonStyle} btn rounded-3 fw-semibold text-white`}>
              Create profile
            </button>
          </div>
        </div>
        {/* modal */}
        {showModal && (
          <>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" ref={modalRef}>
                  <div className="modal-header">
                    <h5 className="modal-title">Profile Photo</h5>
                    <button type="button" className="btn-close" onClick={handleClose}></button>
                  </div>
                  <div className="modal-body text-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHUndSzxcF1UbSXX3bVILVaUbSIhoc_GEA8g&s"
                      alt="Enlarged"
                      className="img-fluid rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal-backdrop fade show"
              style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
            ></div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileCard;
