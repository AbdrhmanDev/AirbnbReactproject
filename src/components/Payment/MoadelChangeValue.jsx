// import { format, subDays } from 'date-fns';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import { ChangeBookingThunk } from '../../services/Slice/Booking/ChangeBooking';
const MoadelChangeValue = ({ showChangValue, setshowChangValue, 
    startDate, endDate ,adults,BookingID,
    _id
}) => {
    const [selectedTab, setSelectedTab] = useState('dates');
    const [StartDate, setStartDate] = useState(new Date(startDate));
    const [EndDate, setEndDate] = useState(new Date(endDate));
    const handleClose = () => setshowChangValue(false);
    const [adultss, setAdults] = useState(adults);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);

    const [pets] = useState(0);
    const dispatch = useDispatch();
    const handleChangeValue = async () => {
    
    // const newStartDate = format(subDays(startDate, 1), 'MM/dd/yyyy');
    // const newEndDate = format(subDays(endDate, 1), 'MM/dd/yyyy');
        setshowChangValue(false)
      const res = await dispatch(ChangeBookingThunk({
            startDate:StartDate,
            endDate:EndDate,
            propertyId:_id,
            bookingId:BookingID
        }))
        console.log(res);
        
    }


    return (
        <>
            <Modal show={showChangValue}  size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change reservation details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center w-100'>
                        <div className='w-75 bg-body-secondary rounded-5 '>
                            <button className=' m-2 py-2 rounded-5 border-0 '
                                style={{
                                    width: "260px",
                                    backgroundColor: selectedTab === 'dates' ? '#fff' : '#e9ecef' // لون مميز عند التحديد
                                }}
                                onClick={() => setSelectedTab('dates')}
                            >Dates</button>
                            <button className=' m-2 py-2 rounded-5 border-0 '
                                style={{
                                    width: "260px",
                                    backgroundColor: selectedTab === 'guests' ? '#fff' : '#e9ecef'
                                }}
                                onClick={() => {
                                    setSelectedTab('guests')

                                }
                                }
                            >Guests</button>
                        </div>
                    </div>
                    {
                        selectedTab == 'dates' ?
                            <>
                                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                                    <div className="d-flex gap-4">
                                        <div >
                                            <DatePicker
                                                selected={StartDate}
                                                onChange={(update) => setStartDate(update)}
                                                inline
                                            />
                                        </div>
                                        <div>
                                            <DatePicker
                                                selected={EndDate}
                                                onChange={(update) => setEndDate(update)}
                                                inline
                                            />
                                        </div>
                                    </div>
                                </div>
                            </> :
                            <div className='w-100 d-flex justify-content-center'>
                                <div className="w-75 d-flex flex-column justify-content-center " >
                                <p style={{ color: "#6c757d" ,fontSize:"14px"}} className='mt-3'>
                                    This place has a maximum of 2 guests, not including infants. Pets aren't allowed.
                                </p>

                                {/* Row for Adults */}
                                <div className="d-flex justify-content-between ">
                                    <div>
                                        <div className="fw-bold">Adults</div>
                                        <div style={{ fontSize: "14px", color: "#6c757d" }}>Age 13+</div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <button className='border-0 py-2 px-3 rounded-circle' onClick={() => adultss > 1 && setAdults(adultss - 1)}>-</button>
                                        <span>{adultss}</span>
                                        <button className='border-0 py-2 px-3 rounded-circle' onClick={() => setAdults(adultss + 1)}>+</button>
                                    </div>
                                </div>

                                {/* Row for Children */}
                                <div className="d-flex justify-content-between align-items-center my-3">
                                    <div>
                                        <div className="fw-bold">Children</div>
                                        <div style={{ fontSize: "14px", color: "#6c757d" }}>Ages 2 – 12</div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <button className='border-0 py-2 px-3 rounded-circle'
                                         onClick={() => children > 0 && setChildren(children - 1)}>-</button>
                                        <span>{children}</span>
                                        <button className='border-0 py-2 px-3 rounded-circle'
                                         onClick={() => setChildren(children + 1)}>+</button>
                                    </div>
                                </div>

                                {/* Row for Infants */}
                                <div className="d-flex justify-content-between align-items-center my-3">
                                    <div>
                                        <div className="fw-bold">Infants</div>
                                        <div style={{ fontSize: "14px", color: "#6c757d" }}>Under 2</div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <button className='border-0 py-2 px-3 rounded-circle'
                                        onClick={() => infants > 0 && setInfants(infants - 1)}>-</button>
                                        <span>{infants}</span>
                                        <button className='border-0 py-2 px-3 rounded-circle'
                                         onClick={() => setInfants(infants + 1)}>+</button>
                                    </div>
                                </div>

                                {/* Row for Pets */}
                                <div className="d-flex justify-content-between align-items-center my-3">
                                    <div>
                                        <div className="fw-bold">Pets</div>
                                        <div style={{ fontSize: "14px", color: "#6c757d" }}>
                                            <a href="#">Bringing a service animal?</a>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <button disabled className='border-0 py-2 px-3 rounded-circle'>-</button>
                                        <span>{pets}</span>
                                        <button className='border-0 py-2 px-3 rounded-circle' disabled>+</button>
                                    </div>
                                </div>
                            </div>
                            </div>
                    }
                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-between'>
                    <Button variant="secondary" onClick={handleClose}>
                        clear
                    </Button>
                    <Button variant="primary" className='bg-dark' onClick={handleChangeValue}>
                        Save 
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MoadelChangeValue