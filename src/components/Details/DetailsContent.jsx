import React, { useState, useEffect, useRef } from 'react';
import './Details.css';
import leftImg from '../../assets/left.png';
import rightImg from '../../assets/right.png';
import { GoStarFill } from "react-icons/go";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RxDrawingPinFilled } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { ImFlag } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch} from 'react-redux';
import { BookingAvailableThunk } from '../../services/Slice/Booking/AvailableBooking';

const DetailsContent = ({
    aboutThisSpace, spaceDetails,
    title, rating, address, hostId,
    amenities, propertyType, images, _id,
    advantages, pricePerNight, capacity
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [monthsShown, setMonthsShown] = useState(2);
    const [showGuests, setShowGuests] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDates, setEndDate] = useState(new Date())
    const [adults, setAdults] = useState(capacity.adults);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [pets, setPets] = useState(0);
    const navigate = useNavigate()
    const ClearMaun = useRef()
    const Createt = new Date(hostId.createdAt);
    Createt.toLocaleDateString("en-GB");
    const now = new Date();
    const diffInMs = now - Createt;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const daysDiff = Math.max(dayjs(endDates).diff(dayjs(startDate), 'day'), 0);
    const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
    const formattedEndDate = dayjs(endDates).format('YYYY-MM-DD');
    const fullMonths = Math.floor(daysDiff / 30);
    const remainingDays = daysDiff % 30;
    const monthlyPrice = pricePerNight * 30 * 0.8;
    const totalPrice = (monthlyPrice * fullMonths) + (pricePerNight * remainingDays);
    const [isErrorBooking, setisErrorBooking] = useState('')
    const dispatch= useDispatch()
    
    
    
    const HotelReservation = async () => {    
       const res = await dispatch(BookingAvailableThunk({
        startDate: startDate,
        endDate: endDates,
        propertyId: _id
      }));
      
      setisErrorBooking(res.payload.message)
        if (res.payload.isBooked === false) {
            navigate(`/book/stays?detailId=${_id}&pets=${pets}&adults=${adults}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&title=${encodeURIComponent(title)}&rating=${rating}&image=${encodeURIComponent(images[0])}&months=${fullMonths}&days=${remainingDays}&monthlyPrice=${monthlyPrice}&totalPrice=${totalPrice}&guests=${spaceDetails.rooms}&pricePerNight=${pricePerNight}`)
        }
    }
    console.log(hostId?.firstName);
    

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };
    useEffect(() => {
        const updateMonthsShown = () => {
            setMonthsShown(window.innerWidth < 576 ? 1 : 2);
        };
        updateMonthsShown();
        window.addEventListener('resize', updateMonthsShown);
        // Clean up the event listener
        return () => {
            window.removeEventListener('resize', updateMonthsShown);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ClearMaun.current && !ClearMaun.current.contains(event.target)) {
                setShowGuests(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    const handelShowGusts = () => {
        console.log("onClick");
        setShowGuests(true)
    }

    const countRender = (label, subLabel, value, setValue) => (
        <div>
            <div className='w-100 d-flex bg-light mt-1 '>
                <div className='w-50 ms-2'>
                    <span style={{ fontSize: "14px" }}>{label}</span>
                    <p style={{ fontSize: "10px" }}>{subLabel}</p>
                </div>
                <div className='w-50 ms-2 mt-2'>
                    <span className={`border p-1 ps-2 pe-2 ms-3 rounded-circle ${value == 0 ? 'opacity-50' : ''}`}
                        onClick={() => { if (value > 0) setValue(value - 1) }}
                    >-</span>
                    <span className=' ms-4' >{value}</span>
                    <span className='border p-1 ps-2 pe-2 ms-3 rounded-circle pointer-event' onClick={() => setValue(value + 1)}>+</span>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div className="container mt-2 w-75">
                <div className="row justify-content-center">
                    {/* اليسار: التفاصيل */}
                    <div className="col-12 col-lg-8">

                        <h4 className='ms-3'>{title}</h4>
                        <h6 className='ms-3' style={{ fontSize: "15px", maxWidth: "90%" }}>{aboutThisSpace}</h6>
                        <div className='ms-3' style={{ fontSize: "12px" }}>
                            <span>{spaceDetails.bedrooms} bedrooms</span>
                            <span> {spaceDetails.path} bath</span>
                            <span> {spaceDetails.beds} beds </span>
                            <span>{spaceDetails.rooms} guests</span>
                        </div>

                        {/* --------------------- */}
                        {/* لابتوب */}
                        <div className="border rounded-2 border-opacity-25 border-light-1 mt-3 mb-4 ms-3 w-75 d-none d-lg-block" role="button">
                            <div className="row">
                                <div className="col-3 m-auto text-center d-flex">
                                    <img src={leftImg} className="img-sec2" alt="" />
                                    <div>
                                        <h5 className="m-2" style={{ fontSize: "12px" }}>Guest</h5>
                                        <h5 className="m-2" style={{ fontSize: "12px" }}>favorite</h5>
                                    </div>
                                    <img src={rightImg} className="img-sec2" alt="" />
                                </div>
                                <h5 className="col-5 m-auto" style={{ fontSize: "14px" }}>
                                    One of the most loved homes on Airbnb, according to guests
                                </h5>
                                <div className="col-2 text-center border-start border-end m-auto">
                                    <h2 className="mb-0" style={{ fontSize: "18px" }}>4.98</h2>
                                    <div style={{ fontSize: "12px" }}>
                                        <GoStarFill />
                                        <GoStarFill />
                                        <GoStarFill />
                                        <GoStarFill />
                                        <GoStarFill />
                                    </div>
                                </div>
                                <div className="col-2 text-center mt-2 pt-2">
                                    <h2 className="mb-0" style={{ fontSize: "20px" }}>{rating}</h2>
                                    <p className="text-decoration-underline" style={{ fontSize: "12px" }}>Reviews</p>
                                </div>
                            </div>
                        </div>

                        {/* موبايل */}
                        <div className="border rounded-3 shadow-sm mt-4 mb-4 px-3 py-3 m-auto d-flex d-lg-none justify-content-between align-items-center flex-wrap text-center gap-3" style={{ width: "93%" }}>
                            <div className="d-flex flex-column align-items-center flex-grow-1">
                                <h5 className="mb-1" style={{ fontSize: "16px" }}>{rating}</h5>
                                <div className="text-warning" style={{ fontSize: "14px" }}>
                                    <GoStarFill />
                                    <GoStarFill />
                                    <GoStarFill />
                                    <GoStarFill />
                                    <GoStarFill />
                                </div>
                            </div>
                            <div className="d-flex flex-column align-items-center flex-grow-1">
                                <div className="d-flex align-items-center justify-content-center gap-2">
                                    <img src={leftImg} alt="left" style={{ width: "16px", height: "16px" }} />
                                    <div>
                                        <h6 className="mb-0" style={{ fontSize: "14px" }}>Guest</h6>
                                        <h6 className="mb-0" style={{ fontSize: "14px" }}>favorite</h6>
                                    </div>
                                    <img src={rightImg} alt="right" style={{ width: "16px", height: "16px" }} />
                                </div>
                            </div>
                            <div className="d-flex flex-column align-items-center flex-grow-1">
                                <h5 className="mb-1" style={{ fontSize: "16px" }}>{rating}</h5>
                                <span className="text-decoration-underline" style={{ fontSize: "13px" }}>Reviews</span>
                            </div>
                        </div>

                        <div className="row border-bottom pb-3 m-1 ">
                            <div className="col-1 ps-3">
                                <img src={hostId.avatar} className="rounded-circle userImg" alt="" />
                            </div>
                            <div className="col flex-column ms-4">
                                <h5 className='' style={{ fontSize: "12px" }}>Hosted by {hostId?.name}</h5>
                                <div className='' style={{ fontSize: "12px" }}>{diffInDays} day {diffInMonths} Months hosting</div>
                            </div>
                        </div>


                        <div className="d-flex flex-column m-3 m-sm-0">
                            {/* معلومات إضافية */}
                            {advantages.map((ind, index) => (
                                <div className=" mt-3" key={index}>
                                    <div className="col-12">
                                        <h5 className="fs-6">{ind}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="d-flex flex-column m-3 m-sm-0">

                            <div className="mt-1 p-1 rounded" style={{ backgroundColor: "#F7F7F7" }}>
                                <span className="fs-6">Some info has been automatically translated</span>
                                <button type="button" style={{ fontSize: "14px", backgroundColor: "#F7F7F7" }} className="border-0 ms-1 p-0 text-decoration-underline">Show original</button>
                            </div>
                            <div className="mt-2"><h3>About this place</h3></div>
                            <div className="mt-2"><span>{address.fullAddress}</span></div>
                            <div className="mt-2"><span>{aboutThisSpace}</span></div>
                            <div className="mt-2"><div>{propertyType}</div><div>Louvre (25mn)...</div></div>

                        </div>

                        <div className="flex-column mt-2 mb-3">
                            <h3 className='m-3 m-sm-0 pb-2 pt-2'>Where you’ll sleep</h3>
                            <img src={images?.[4]} className="img-room  m-sm-0 rounded-1" role="button" alt="" />
                            <div className="border-bottom pb-2 d-flex d-sm-block mt-2" role="button">
                                <p className="me-2">{spaceDetails.bedrooms} bedrooms</p>
                                <div>{spaceDetails.beds} beds</div>
                            </div>
                        </div>


                        {/* -------====================================--------١٢٣٤٥٦٧٨٩يبلاتنمك٨٩٠----- */}
                        <div className="row border-bottom pb-4 m-1 m-sm-0">

                            <h4 className="">What this place offers
                            </h4>

                            <div className="col-md-5">
                                <div className="row  w-100">
                                    {
                                        amenities.slice(0, isExpanded ? amenities.length : 3).map((ind, i) => (
                                            <div className="mt-2 col-md-5 w-75 " key={i}>
                                                <i className={ind.icon}></i> <span className=''>{ind.name}</span>
                                            </div>
                                        ))
                                    }
                                    {amenities.length > 3 && (
                                        <div className="mt-3">
                                            <button type="button" className="btn border-black ms-2 fs-6 hover" onClick={handleToggle}>
                                                {isExpanded ? 'Show less' : `Show all ${amenities.length} amenities`}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="row mt-3 d-flex justify-content-center">
                            <DatePicker
                                id='dateWithValue'
                                swapRange
                                selected={startDate}
                                onChange={(update) => setStartDate(update)}
                                selectsRange
                                selectsDisabledDaysInRange
                                inline
                                monthsShown={monthsShown}
                                minDate={new Date()}
                            />
                        </div>

                        <span className=""> <i className="fa-regular fa-keyboard fs-6 hover p-2 rounded-circle" role="button"></i></span>

                    </div>
                    {/* اليمين: الكارد */}
                    <div className="col-12 col-lg-4 mt-4 mt-lg-0">
                        <div className="p-4 position-sticky custom-edit">
                            <div className='mb-4 card d-block shadow p-2 ps-5 position-sticky custom-edit ' >
                                <RxDrawingPinFilled size={"22px"} className='text-danger ms-3' />
                                <span className='ms-2 ps-3' style={{ fontSize: "12px" }}>Prices Not include fees</span>
                            </div>
                            <div className="card shadow p-4 position-sticky custom-edit">
                                <h5 className="card-title mb-4">
                                    {
                                        daysDiff === 0 ? (
                                            <>
                                                ${pricePerNight}
                                                <span className='text-muted ps-1' style={{ fontSize: "16px" }}>
                                                    1 night
                                                </span>
                                            </>
                                        ) : daysDiff >= 30 ? (
                                            (() => {

                                                return (
                                                    <>
                                                        ${totalPrice.toFixed(2)}
                                                        <span className='text-muted ps-1' style={{ fontSize: "16px" }}>
                                                            {fullMonths} month{fullMonths > 1 ? 's' : ''}
                                                            {remainingDays > 0 && ` and ${remainingDays} night${remainingDays > 1 ? 's' : ''}`}
                                                            {" Monthly discount for month only"}
                                                        </span>
                                                    </>
                                                );
                                            })()
                                        ) : (
                                            <>
                                                ${(pricePerNight * daysDiff).toFixed(2)}
                                                <span className='text-muted ps-1' style={{ fontSize: "16px" }}>
                                                    {daysDiff} night{daysDiff > 1 ? 's' : ''}
                                                </span>
                                            </>
                                        )
                                    }
                                </h5>
                                <form className='rounded-2 border-5'>
                                    <div className="d-flex border-4 rounded-top-2 w-100 " >
                                        <div className="" id='dateWithValue'>
                                            <DatePicker
                                                className="w-100 p-2 ps-3 border-1 custom-data1"
                                                id="Check-In"
                                                minDate={new Date()}
                                                placeholderText='Add date'
                                                selected={startDate}
                                                onChange={(data) => setStartDate(data)}
                                            />
                                        </div>
                                        <div className="">
                                            <DatePicker
                                                    minDate={new Date()}
                                                className="w-100 p-2 ps-3 border-1 custom-data2"
                                                id="Check-Out"
                                                placeholderText='Add date'
                                                selected={endDates}
                                                onChange={(data) => setEndDate(data)}
                                            />
                                        </div>
                                    </div>
                                    <div className='border-2  position-relative' onClick={handelShowGusts}>

                                        <button type="button" className='w-100 rounded-bottom-2 border-1 bg-body p-2 '>
                                            {
                                                spaceDetails.rooms == 0 ? 'No guests' : `${spaceDetails.rooms} guests`
                                            }, {
                                                capacity.infants == 0 ? " No infants " : `${capacity.infants} infants`
                                            }
                                            <IoIosArrowDown className='ms-5' />
                                        </button>
                                        <div ref={ClearMaun} className='position-relative position-absolute w-100 border rounded-bottom-2 p-2 bg-light'>
                                            {
                                                <>

                                                    <div>
                                                        {showGuests &&
                                                            <>
                                                                {countRender("adults", `Age ${capacity.adults}+`, adults, setAdults)}
                                                                {countRender("Children", `max ${capacity.children}`, children, setChildren)}
                                                                {countRender("Infants", `Under ${capacity.infants}`, infants, setInfants)}
                                                                {countRender("Pets", "Age 2-12", pets, setPets)}
                                                                <div className='w-100'>
                                                                    <p style={{ fontSize: "12px" }} className='m-2'>This place has a maximum of 7 guests, not including infants. Pets aren't allowed.</p>
                                                                    <div className='d-flex justify-content-between'>
                                                                        <button type='button' className=' m-2 border-0 bg-light text-dark' onClick={() =>
                                                                            [setAdults(0), setChildren(0), setPets(0), setInfants(0)]
                                                                        }>
                                                                            Clear
                                                                        </button>
                                                                        <button type='button' className='m-2 border-0 bg-light' onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setShowGuests(false)
                                                                        }}>
                                                                            Close
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </>}
                                                    </div>
                                                </>}
                                        </div>
                                    </div>
                                </form>
                                <Link type="button" className="btn btn-danger w-100 mt-3"
                                    onClick={HotelReservation}
                                >Check availability</Link>
                                {/* error massage */}
                              {
                                isErrorBooking ? <span className='text-danger ms-1 mt-2'>{isErrorBooking}</span> : ''
                              }
                                <p style={{ fontSize: "12px" }} className='m-2 text-center'>You won't be charged yet</p>
                            </div>
                            <div className='text-center mt-2'>
                                <ImFlag size={"12px"} />
                                <Link className='text-dark ms-2 text-center' style={{ fontSize: "12px" }}>Report this listing</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailsContent;
