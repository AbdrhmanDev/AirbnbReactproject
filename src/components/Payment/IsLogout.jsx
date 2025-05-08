import React, { useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GiLaurels } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import ModalLogin from '../Login/ModalLogin';
import { emitter } from '../../features/emitter';
import { FaPaypal } from "react-icons/fa6";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { FaGooglePay } from "react-icons/fa";
import { PaymentFirstThunk } from '../../services/Slice/Payment/Payment';
const IsLogout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const title = searchParams.get("title");
  const image = searchParams.get("image");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const rating = searchParams.get("rating");
  const days = searchParams.get("days");
  const guests = searchParams.get("guests");
  const HotelById = useSelector((state) => state.HotelByID.getById) || [];
  let totalPrice = HotelById?.pricePerNight * days;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startDay = start.getDate();
  const startMonthName = start.toLocaleString('en-EG', { month: 'long' });
  const endDay = end.getDate();
  const endMonthName = end.toLocaleString('en-EG', { month: 'long' });
  const [isLoginIn] = useState(true)
  const Hotel = useSelector((state)=>state.booking.booking);
  const Payment = useSelector((state)=>state.PaymentFirst.Payment);
  console.log(Payment);
  

  const idHotel=Hotel?.booking?._id;
  const dispatch= useDispatch();
  console.log(Hotel);
  console.log(idHotel);

  const handelPayment=()=>{    
    setTimeout(()=>{
    window.open(Payment?.approvalUrl,'_blank','width=600px,hight=300px,left=400,top100');
    },2000)
    dispatch(PaymentFirstThunk(idHotel))  
  }


  return (
    <>
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
                  <input type="radio" readOnly name="Payment" value="Credit" style={{width:"20px"}}/>
                  </div>
                 

                  <div className='d-flex pb-3 justify-content-between fs-5'>
                  <div className='mt-3'>
                  <FaPaypal color='#00457C'/>
                  <span className='ps-2 fs-5'>PayPal</span>
                  </div>
                  <input type="radio" readOnly name="Payment" value="FaPaypal" checked style={{width:"20px"}} className='mt-3'/>
                  </div>
                  <div className='m-2  text-end'>
                  <button className='m-2  px-3 py-2 rounded-2 border-0 text-light'
                   style={{backgroundColor:"#0B3382"}}
                   onClick={handelPayment}
                   >Connect to paypal</button>
                  </div>

                  <div className='d-flex mt-3 pt-2 border-top pb-3 justify-content-between fs-5'>
                  <div >
                  <FaGooglePay />
                  <span className='ps-2 fs-5'>Google Pay</span>
                  </div>
                  <input type="radio" readOnly name="Payment" value="Google Pay" style={{width:"20px"}}/>
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
              </div>
            </div>
          </div>
          <div className='col-lg-6 d-flex justify-content-lg-end col-md-12  justify-content-md-center mb-5 pb-5'>
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
                  <button className='border-0 p-2 rounded-2'>Change</button>
                </div>
                <p className='m-0'>{startMonthName + " " + startDay} to {endMonthName + " " + endDay} </p>
                <span className=''>{guests} adult</span>
              </div>

              <div className='m-4 border-bottom'>
                <span >Price details</span>
                <div className='d-flex justify-content-between'>
                  <span className='mt-1'>{HotelById?.pricePerNight} <p className='d-inline text-muted'>night</p> x {days}</span>
                  <p className='mt-1'>${totalPrice}</p>
                </div>
              </div>
              <div className='m-4 '>
                <div className='d-flex justify-content-between m-0 p-0'>
                  <span>Total</span>
                  <p>${totalPrice}</p>
                </div>
                <a href="" className='text-dark m-0 p-0'>Price breakdown</a>
              </div>
            </div>
          </div>
        </div>
        <ModalLogin />
      </div>
    </>
  )
}

export default IsLogout