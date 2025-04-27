import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './Profile.module.css';
import { fetchProfileThunk } from '../../services/Slice/Profile/ProfileAPI';
import { differenceInDays, differenceInMonths } from 'date-fns';
import ProfileAbout from '../../features/ProfileAbout/ProfileAbout';
import { useNavigate } from 'react-router-dom';
import Personalinfo from './Personal info/Personalinfo';

const ProfileCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showProfileAbout, setShowProfileAbout] = useState(false);
  const modalRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const { user } = useSelector((state) => state.userProfile.profile) || [];
  const date = new Date(user?.createdAt)
  const now = new Date();
  date.toLocaleDateString();
  const day = differenceInDays(now, date)
  const mon = differenceInMonths(now, date)
  const firstName = user?.name;
  const newFirst = firstName?.slice(0, firstName.indexOf(' '));
  //عملت الكوندشن دا علشان لو المسخدم محطش مسافه ميمسحش اخر حرف في اسمه
  const firstNameNew = newFirst !== -1 ? newFirst : "";
  

  
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
  
  useEffect(() => {
    dispatch(fetchProfileThunk())
    const firstLogin = localStorage.getItem('firstLogin');
    if (!firstLogin) {
      setShowProfileAbout(true); // Show ProfileSection if first time
    }
  }, []);

  const FirstLogin = () => {
    localStorage.setItem('firstLogin', 'true');
    setShowProfileAbout(false);
    navigate('/account/ProfileSection')
  }

  return (
    <>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-10">
            <div className="row">
              {/* Left side */}
              <div className="col-12 col-lg-5 mb-4 ">
                <div className={`p-4 shadow-lg rounded-5   ${style.custom_card}`}>
                  <div className="row">
                    <div className="col-6 text-center align-content-center">
                      <img
                        src={user?.avatar}
                        onClick={handleOpen}
                        className={style.userImg2}
                        alt={firstNameNew}
                      />
                      <h5 className="mt-3 mb-1">{firstNameNew}</h5>
                      <p className="text-muted">{user?.role}</p>
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center text-center">
                      {
                        mon === 0 ?
                          <>
                            <h4 className="fw-bold">{day}</h4>
                            <small className={`${style.changSize} text-muted`}>days on Airbnb</small>
                          </> :
                          <>
                            <h4 className="fw-bold">{isNaN(mon) ? 0 : mon}</h4>
                            <small className={`${style.changSize} text-muted`}>Months on Airbnb</small>
                          </>
                      }
                    </div>
                  </div>
                </div>
                <div className={`p-4 mt-3 rounded-4 shadow-sm ${style.card}`}>
                  <h5 className="fw-bold mb-4">{firstNameNew} confirmed information</h5>
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
              {/* Right side */}
              <div className="col-12 col-lg-6">
                {showProfileAbout ? (
                  <div className="pt-4">
                    <hr />
                    <p className="fw-bold mt-4 mb-2">It's time to create your profile</p>
                    <p className="text-muted mb-4">
                      Your Airbnb profile is an important part of every reservation. Create yours to help
                      other Hosts and guests get to know you.
                    </p>
                    <button
                      onClick={FirstLogin}
                      className={`${style.buttonStyle} btn rounded-3 fw-semibold text-white`}
                    >
                      Create profile
                    </button>
                  </div>
                ) : (
                  <ProfileAbout firstNameNew={newFirst} />
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <>
          {/* Modal */}
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content" ref={modalRef}>
                <div className="modal-header">
                  <h5 className="modal-title">Profile Photo</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleClose}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <img
                    src={user?.avatar}
                    alt="Enlarged"
                    className="img-fluid rounded-circle w-50"
                    style={{ maxHeight: '700px' }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Backdrop */}
          <div
            className="modal-backdrop fade show"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1040,
            }}
          ></div>
        </>
      )}
    </>
  );
};

export default ProfileCard;
