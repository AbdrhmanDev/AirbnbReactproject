import React, { useEffect, useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GiLaurels } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import ModalLogin from '../Login/ModalLogin';
import { emitter } from '../../features/emitter';
import { FaPaypal } from "react-icons/fa6";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { FaGooglePay } from "react-icons/fa";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PaymentFirstThunk } from '../../services/Slice/Payment/Payment';
import { IoMdCheckmarkCircle } from "react-icons/io";
import { getUserTripThunk } from '../../services/Slice/Trip';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { BookingThunk } from '../../services/Slice/Booking/Booking';
import { useRef } from 'react';
import MoadelChangeValue from './MoadelChangeValue';

const IsLogout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const title = searchParams.get("title");
  const image = searchParams.get("image");
  const pricePerNight = searchParams.get("pricePerNight");
  const [startDate, setStartDate] = useState(searchParams.get("startDate"));
  const [endDate, setEndDate] = useState(searchParams.get("endDate"));
  const rating = searchParams.get("rating");
  const pets = searchParams.get("pets");
  const [adults, setAdults] = useState(searchParams.get("adults"));
  const [days, setDays] = useState(searchParams.get("days"));
  const _id = searchParams.get("detailId");
  const guests = searchParams.get("guests");
  const HotelById = useSelector((state) => state.HotelByID.getById) || [];
  const [totalPrice, setTotalPrice] = useState(HotelById?.pricePerNight * days);
  const tax = 0.14;
  const [totalPriceFinal, setTotalPriceFinal] = useState((totalPrice + totalPrice * tax).toFixed(2));
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startDay = start.getDate();
  const startMonthName = start.toLocaleString('en-EG', { month: 'long' });
  const endDay = end.getDate();
  const endMonthName = end.toLocaleString('en-EG', { month: 'long' });
  var isLoginIn = useSelector((state) => state.auth.token);
  const Hotel = useSelector((state) => state.booking.booking);
  const tripData = useSelector((state) => state.UserTrip.trip) || [];
  const dispatch = useDispatch();
  const idHotel = Hotel?.booking?._id;
  const [statusPayment, setstatusPayment] = useState(false);
  const hasDispatchedBooking = useRef(false);
  const [showChangValue, setshowChangValue] = useState(false);
  const [BookingID, setBookingID] = useState(null);

  // Listen for booking updates
  useEffect(() => {
    const handleBookingUpdate = (data) => {
      setStartDate(data.startDate);
      setEndDate(data.endDate);
      setAdults(data.adults);
      setDays(data.days);
      setTotalPriceFinal(data.totalPrice);
    };

    emitter.on('booking-updated', handleBookingUpdate);

    return () => {
      emitter.off('booking-updated', handleBookingUpdate);
    };
  }, []);

  useEffect(() => {
    const Booking = async () => {
      const res = await dispatch(BookingThunk({
        properties: [
          {
            propertyId: _id,
            startDate,
            endDate,
            price: pricePerNight,
            companions: adults,
            petsAllowed: pets,
            paymentStatus: "pending",
            totalPrice: totalPrice,
            paymentMethod: "paypal",
          }
        ]
      }));
      setBookingID(res.payload.booking._id);  
      console.log(res);
    };
    console.log(totalPrice);
    if (isLoginIn && !hasDispatchedBooking.current) {
      hasDispatchedBooking.current = true;
      Booking();
    }
  }, [isLoginIn]);

  useEffect(() => {
    const handleFocus = () => {
      dispatch(getUserTripThunk());
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [dispatch]);
  
  useEffect(() => {
    const matchingTrip = tripData.find(trip => trip._id === idHotel);

    if (
      matchingTrip &&
      matchingTrip.properties?.some(property => property.status === 'completed')
    ) {
      setstatusPayment(true);
    } else {
      setstatusPayment(false);
    }
  }, [tripData, idHotel]);
  useEffect(() => {
    if (startDate && endDate && pricePerNight) {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      // فرق الأيام
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      const newDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
      setDays(newDays);
  
      const newTotalPrice = pricePerNight * newDays;
      setTotalPrice(newTotalPrice);
  
      const tax = 0.14;
      const finalPrice = (newTotalPrice + newTotalPrice * tax).toFixed(2);
      setTotalPriceFinal(finalPrice);
    }
  }, [startDate, endDate, pricePerNight]);
  
  var handelPayment = async () => {
    try {
      const response = await dispatch(PaymentFirstThunk(idHotel));
      if (response.payload?.approvalUrl) {
        window.open(
          response.payload.approvalUrl,
          'PayPal Payment',
          'width=600,height=600,left=400,top=100'
        );
      }
    } catch (error) {
      console.error(error)
      alert('Failed to initialize payment. Please try again.');
    }
  };
  
  return (
    <>
      <PayPalScriptProvider options={{ "client-id": "AVpz0jD3i5fe0TQHfA9VoVJWzuQ2TORj4hqs4EynrpzihlimSnm1iWTr5EdfU2afBvqh6mGuB22oPH8a", currency: "USD" }}>
        <div className='container-fluid w-75'>
          <div className='d-flex align-items-center w-100'>
            <IoArrowBack onClick={() => navigate(-1)} className='text-dark bg-light p-2 rounded-circle popover cursor-pointer' size={"40px"} />
            <h3 className='mt-1 pt-1 ms-3'>Confirm and pay</h3>
          </div>
          <div className='row mb-4'>
            <div className='col-lg-5 col-md-12  mt-5'>
              {
                !isLoginIn ?
                  <div className='col-12 mb-4 shadow rounded-4 bg-body-tertiary p-4' style={{ border: "0.1px solid #ccc" }}>
                    <div className='d-flex flex-column flex-sm-row justify-content-between'>
                      <h5 className='mt-2  mb-3 mb-sm-1'>1. Log in or sign up</h5>
                      <button className='text-light p-lg-2  ps-lg-3  pe-lg-3 p-md-3 rounded-3 border-0'
                        onClick={() => emitter.emit('open-modal')}
                        style={{ backgroundColor: "#DC0F63" }}>Continue</button>
                    </div>
                  </div> : " "
              }

              <div className='col-12 mb-4 rounded-4  p-3' style={{ border: "0.1px solid #ccc" }}>
                <div className=''>
                  <h5 className='mt-3 '>{
                    !isLoginIn ? "2. Add a payment method" : "1. Add a payment method"}</h5>

                  {
                    isLoginIn ?
                      <>
                        <div className='d-flex mt-4 border-bottom pb-3 justify-content-between fs-5'>
                          <div>
                            <BsCreditCard2BackFill />
                            <span className='ps-2 fs-5'>Credit or debit card</span>
                          </div>
                          <input type="radio" readOnly name="Payment" value="Credit" style={{ width: "20px" }} />
                        </div>


                        <div className='d-flex pb-3 justify-content-between fs-5'>
                          <div className='mt-3'>
                            <FaPaypal color='#00457C' />
                            <span className='ps-2 fs-5'>PayPal</span>
                          </div>
                          <input type="radio" readOnly name="Payment" value="FaPaypal" checked style={{ width: "20px" }} className='mt-3' />
                        </div>
                        <div className='m-2  text-end'>
                          {
                            !statusPayment ? <button className='m-2  px-3 py-2 rounded-2 border-0 text-light'
                            style={{ backgroundColor: "#0B3382" }}
                            onClick={handelPayment}
                          >Connect to paypal</button> :
                          <button className='m-2  px-3 py-2 rounded-2 border-0 text-light'
                          style={{ backgroundColor: "#0B3382" }}
                          
                          disabled={statusPayment}
                        > Payment successfully </button>
                          }
                        </div>

                        <div className='d-flex mt-3 pt-2 border-top pb-3 justify-content-between fs-5'>
                          <div >
                            <FaGooglePay />
                            <span className='ps-2 fs-5'>Google Pay</span>
                          </div>
                          <input type="radio" readOnly name="Payment" value="Google Pay" style={{ width: "20px" }} />
                        </div>
                      </> : " "
                  }
                </div>
              </div>

              <div className='col-12 mb-4 rounded-4 bg-body-tertiary p-3' style={{ border: "0.1px solid #ccc" }}>
                <div className=''>
                  <h5 className='mt-3'>{
                    !isLoginIn ? "3. Review your reservation " : "2. Review your reservation"
                  }</h5>
                  {
                    statusPayment &&
                    <div className="card shadow-sm p-3 mb-4 bg-white rounded m-auto mt-5 border-success">
                    <div className="card-body text-center">
                    <IoMdCheckmarkCircle size={"40px"} color='#06BA00' />
                      <h4 className="card-title text-success mb-3 mt-2">Your reservation has been completed successfully</h4>
                      <p className="card-text mb-2">
                        <strong> reservation : {startMonthName + " " + startDay} to {endMonthName + " " + endDay}</strong> 
                      </p>
                      <p className="card-text mb-2">
                        <strong>status : completed</strong> 
                      </p>
                      <button className='py-2 px-3 border-0 rounded-2 text-light mt-2' 
                      style={{backgroundColor:"#FF385C"}}> Trips <FaArrowAltCircleRight className='ms-1'
                      onClick={()=>
                        navigate('/Trips')
                      }
                      />
                      
                      </button>
                    </div>
                  </div>
                  }
                </div>
              </div>
            </div>
            <div className='col-lg-6 d-flex justify-content-m-0-end col-md-12  justify-content-md-center mb-5 pb-5'>
              {/* card details from checkout */}
              <div className='col-lg-9 col-md-10  col-sm-8 mt-5 rounded-4' style={{ border: "0.1px solid #ccc" }}>
                <div className=' col-md-12  col-lg-10 d-flex m-4' style={{ fontSize: "16px" }}>
                  <div className='col-sm-12 col-md-4'>
                    <img className='rounded' src={image} width={100} height={85} alt="" />
                  </div>
                  <div className='mt-2 ms-2 col-sm-12 col-md-8'>
                    <p className='m-0'>{title}</p>
                    <span className='m-0' >&#9733;{rating} {<GiLaurels />} Guest favorite</span>
                  </div>
                </div>
                <div className='m-4 border-bottom col-sm-6 pb-4'>
                  <p className='mb-2'>Free cancellation</p>
                  <span className='d-block' style={{ fontSize: "14px" }}>Cancel before 3:00 PM on May 4 for a full refund.</span>
                  <a href="">Full policy</a>
                </div>

                <div className='m-4 border-bottom pb-4'>
                  <div className='d-flex justify-content-between'>
                    <span>Trip details</span>
                    <button className='border-0 p-2 rounded-2'
                    onClick={()=>{
                      setshowChangValue(true)
                    }}
                    >Change</button>
                  </div>
                  <p className='m-0'>{startMonthName + " " + startDay} to {endMonthName + " " + endDay} </p>
                  <span className=''>{guests} adult</span>
                </div>

                <div className='m-4 border-bottom'>
                  <span >Price details</span>
                  <div className='d-flex justify-content-between'>
                    <span className='mt-1'>{HotelById?.pricePerNight} <p className='d-inline text-muted'>night</p> x {days}</span>
                    <div>
                    <p className='mt-1 m-0 '>${totalPrice}</p>
                    <span className='m-0'> %14 Tax </span>
                    </div>
                  </div>
                </div>
                <div className='m-4 '>
                  <div className='d-flex justify-content-between m-0 p-0'>
                    <span>Total</span>
                    <p>${totalPriceFinal}</p>
                  </div>
                  <a href="" className='text-dark m-0 p-0'>Price breakdown</a>
                </div>
              </div>
            </div>
          </div>
          <ModalLogin />
          <MoadelChangeValue 
            startDate={startDate} 
            endDate={endDate} 
            _id={_id}
            adults={adults} 
            pricePerNight={pricePerNight} 
            total={totalPriceFinal}
            BookingID={BookingID}
            showChangValue={showChangValue} 
            setshowChangValue={setshowChangValue}
          />
        </div>
      </PayPalScriptProvider>
    </>
  )
}

export default IsLogout