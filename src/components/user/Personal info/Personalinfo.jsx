import SmartBreadcrumb from '../readableNames';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import imageinfo from '../../../assets/info.png';
import imagedetails from '../../../assets/details.png';
import imageshard from '../../../assets/shard.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileThunk } from '../../../services/Slice/Profile/ProfileAPI';
import { ProfileEditThunk } from '../../../services/Slice/Profile/EditProfileApi';

const Personalinfo = () => {
  const { user } = useSelector((state) => state.userProfile.profile) || [];
  const update = useSelector((state) => state.ProfileEdit.edit) || [];
  const isLoading = useSelector((state) => state.ProfileEdit.isLoading);
  console.log(update);
  const [legalName, setLegalName] = useState(user?.name);
  const [preferredName, setPreferredName] = useState('');
  const [emails, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState('');
  const [identityVerification, setIdentityVerification] = useState('Not started');
  const [address, setAddress] = useState('');
  const [editName, seteditName] = useState(false)
  const id = user?._id;
  const dispatch = useDispatch()

  const changeNameEdit = () => {
    seteditName(prev => !prev);
  }
  const getNewUserName = async () => {

    try {
      const action = await dispatch(ProfileEditThunk({
        id: id,
        email: emails,
        username: legalName,
        name: legalName,
        avatar: user?.avatar
      }));
      // لو الطلب نجح
      if (ProfileEditThunk.fulfilled.match(action)) {
        seteditName(false);
      }

    } catch (error) {
      console.log("Error updating profile:", error);
      throw new error
    }
  };

  useEffect(() => {
    if (!user) {
      dispatch(fetchProfileThunk());
    }
  }, [dispatch, user]);
  useEffect(() => {
    if (user) {
      // بنحدث القيم علشان لو عمل رفرش يستني يجيب القيم علشان يعرضها الاول 
      setLegalName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);





  return (
    <Container>
      <Row className="gx-4 d-flex justify-content-center">
        {/* Left Section */}
        <Col lg={6} xs={12} className="mb-4 pe-5 mt-1">
          <div className="d-flex justify-content-between align-items-center">
            <SmartBreadcrumb />
          </div>
          <h2 className="mb-4">Personal info</h2>

          {/* Legal name */}
          

          <div className={`d-flex justify-content-between align-items-center ${!editName ? "border-bottom" : ''} py-3 flex-wrap`}>
            <div>
              <h6 className="fw-bold">Legal name</h6>
              <p className="mb-0 text-muted">{legalName || 'Not provided'}</p>
            </div>
            <Button variant="link" className="text-dark p-0" onClick={changeNameEdit}>
              {!editName ? "Edit" : "cancel"}
            </Button>
          </div>
          <div>

            {editName ?
              <>
                <p className='m-1 p-1 text-muted' style={{ fontSize: "13px" }}>Make sure this matches the name on your government ID.</p>
                <input type='text' disabled={isLoading} value={legalName} onChange={(e) => setLegalName(e.target.value)} className='w-100 border-1 rounded-2 text-start ps-3' />
                <button className='rounded-2 m-2 py-2 px-4 border-0 bg-dark text-light'
                  onClick={getNewUserName}
                  disabled={isLoading}
                >
                  {isLoading ? "..." : "Save"}
                </button>
              </>
              : ""}
          </div>


          {/* Preferred first name */}
          <div className="d-flex justify-content-between align-items-center border-bottom py-3 flex-wrap">
            <div>
              <h6 className="fw-bold">Preferred first name</h6>
              <p className="mb-0 text-muted">{preferredName || 'Not provided'}</p>
            </div>
            <Button variant="link" className="text-dark p-0">
              {preferredName ? 'Edit' : 'Add'}
            </Button>
          </div>

          {/* Email address */}
          <div className="d-flex justify-content-between align-items-center border-bottom py-3 flex-wrap">
            <div>
              <h6 className="fw-bold">Email address</h6>
              <p className="mb-0 text-muted">{emails || 'Not provided'}</p>
            </div>
            <Button variant="link" className="text-dark p-0">Edit</Button>
          </div>

          {/* Phone numbers */}
          <div className="d-flex justify-content-between align-items-center border-bottom py-3 flex-wrap ">
            <div className='w-75'>
              <h6 className="fw-bold">Phone numbers</h6>
              <p className="mb-0 text-muted ">
                {phone ? phone : 'Add a number so confirmed guests and Airbnb can get  in touch. You can add other numbers and choose how they’re used.'}
              </p>
            </div>
            <Button variant="link" className="text-dark p-0">{phone ? 'Edit' : 'Add'}</Button>
          </div>

          {/* Identity verification */}
          <div className="d-flex justify-content-between align-items-center border-bottom py-3 flex-wrap">
            <div>
              <h6 className="fw-bold">Identity verification</h6>
              <p className="mb-0 text-muted">{identityVerification}</p>
            </div>
            <Button variant="link" className="text-dark p-0">
              {identityVerification === 'Not started' ? 'Start' : 'Edit'}
            </Button>
          </div>

          {/* Address */}
          <div className="d-flex justify-content-between align-items-center border-bottom py-3 flex-wrap">
            <div>
              <h6 className="fw-bold">Address</h6>
              <p className="mb-0 text-muted">{address || 'Not provided'}</p>
            </div>
            <Button variant="link" className="text-dark p-0">{address ? 'Edit' : 'Add'}</Button>
          </div>

          {/* Emergency contact */}
          <div className="d-flex justify-content-between align-items-center py-3 flex-wrap">
            <div>
              <h6 className="fw-bold">Emergency contact</h6>
              <p className="mb-0 text-muted">{address || 'Not provided'}</p>
            </div>
            <Button variant="link" className="text-dark p-0">{address ? 'Edit' : 'Add'}</Button>
          </div>
        </Col>

        {/* Right Side Card */}
        <Col lg={4} xs={12}>
          <Card className="p-3 mt-5 rounded-4 shadow-sm " style={{ height: "80%" }}>
            <Card.Body>
              {/* First Box */}
              <div className="mb-4">
                <img src={imageinfo} className="mb-2" width="50px" alt="info" />
                <h6 className="fw-bold">Why isn’t my info shown here?</h6>
                <p className="text-muted">We’re hiding some account details to protect your identity.</p>
              </div>

              <hr />

              {/* Second Box */}
              <div className="mt-4">
                <img src={imagedetails} className="mb-2" width="50px" alt="details" />
                <h6 className="fw-bold">Which details can be edited?</h6>
                <p className="text-muted">
                  Contact info and personal details can be edited. If this info was used to verify your identity,
                  you’ll need to get verified again the next time you book—or to continue hosting.
                </p>
              </div>

              {/* Third Box */}
              <div className="mt-4 border-top pt-4">
                <img src={imageshard} className="mb-2" width="50px" alt="shard" />
                <h6 className="fw-bold">What info is shared with others?</h6>
                <p className="text-muted">
                  Airbnb only releases contact information for Hosts and guests after a reservation is confirmed.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Personalinfo;
