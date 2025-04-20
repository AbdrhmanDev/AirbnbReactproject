import React, { useState } from 'react';
import './Details.css';
import leftImg from '../../assets/left.png';
import rightImg from '../../assets/right.png';
import { GoStarFill } from "react-icons/go";
import DatePicker from 'react-datepicker';

const DetailsContent = ({
    aboutThisSpace, spaceDetails,
    title, rating, address, hostId,
    amenities, propertyType, images

}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const createat = new Date(hostId.createdAt);
    createat.toLocaleDateString("en-GB");
    const now = new Date();
    const diffInMs = now - createat;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);


    return (
        <>
            <div className="container mt-2 w-75 ">
                <div className="row justify-content-center">

                    {/* اليسار: التفاصيل */}
                    <div className="col-12 col-lg-8 ">

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
                        <div className="border rounded-3 shadow-sm mt-4 mb-4 px-3 py-3  m-auto d-flex d-lg-none justify-content-between align-items-center flex-wrap text-center gap-3" style={{ width: "93%" }}>
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
                                <img src={hostId.profileImage} className="rounded-circle userImg" alt="" />
                            </div>
                            <div className="col flex-column ms-4">
                                <h5 className='' style={{ fontSize: "12px" }}>Hosted by {hostId.firstName}</h5>
                                <div className='' style={{ fontSize: "12px" }}>{diffInDays} day {diffInMonths} Months hosting</div>
                            </div>
                        </div>

                        <div className="flex-column">
                            {/* معلومات إضافية */}
                            {
                                amenities.map((ind,index) => {
                                    return (
                                        <div className="row mt-4" key={index}>
                                            <div className="col-1">
                                                <i className={ind.icon} style={{ fontSize: '25px' }}></i>

                                            </div>
                                            <div className="col flex-column">
                                                <h5 style={{ fontSize: "15px" }}> {ind.name} </h5>
                                                <div style={{ fontSize: "12px" }}>This home is highly ranked based on ratings, reviews, and reliability.</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="flex-column">
                            <div className="mt-3 p-1 rounded" style={{ backgroundColor: "#F7F7F7" }}>
                                <span className="fs-6">Some info has been automatically translated</span>
                                <button type="button" style={{ fontSize: "14px", backgroundColor: "#F7F7F7" }} className="border-0 ms-1 p-0 text-decoration-underline">Show original</button>
                            </div>
                            <div className="mt-2"><h3>About this place</h3></div>
                            <div className="mt-2"><span>{address.fullAddress}</span></div>
                            <div className="mt-2"><span>{aboutThisSpace}</span></div>
                            <div className="mt-2"><div>{propertyType}</div><div>Louvre (25mn)...</div></div>
                            <div className="mt-2 border-bottom pb-4">
                                <button type="button" className="btn-dark border-0 bg-body ms-2 p-0 fs-6 text-decoration-underline">Show More</button>
                            </div>
                        </div>

                        <div className="flex-column mt-3">
                            <div ><h3>Where you’ll sleep</h3></div>
                            <div><img src={images?.[4]} className="img-room " role="button" alt="" /></div>
                            <div className="mt-2 border-bottom pb-4" role="button">
                                <p> {spaceDetails.bedrooms} bedrooms</p>
                                <div>{spaceDetails.beds} beds </div>
                            </div>
                        </div>



                        <div className="row border-bottom pb-4">
                            <div className="mt-4">
                                <h4 className="">What this place offers
                                </h4>
                            </div>
                            <div className=" col-md-5">
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
                                swapRange
                                selected={startDate}
                                onChange={(update) => setDateRange(update)}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                selectsDisabledDaysInRange
                                inline
                                monthsShown={2}
                            />
                        </div>

                        <span className=""> <i className="fa-regular fa-keyboard fs-6 hover p-2 rounded-circle" role="button"></i></span>

                    </div>

                    {/* اليمين: الكارد */}
                    <div className="col-12 col-lg-4 mt-4 mt-lg-0">
                        <div className="card shadow p-4 position-sticky custom-edit">
                            <h5 className="card-title mb-4">Add dates for prices</h5>
                            <form>
                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="Check-In" className="form-label">Check-In</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="Check-In"
                                            placeholder="Add date"
                                            value={startDate ? startDate.toLocaleDateString("en-GB") : ""}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="Check-Out" className="form-label">Check-Out</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="Check-Out"
                                            placeholder="Add date"
                                            value={endDate ? endDate.toLocaleDateString("en-GB") : ""}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="guests" className="form-label">Guests</label>
                                    <select className="form-select" id="guests">
                                        <option value="1">1 guest</option>
                                        <option value="2">2 guests</option>
                                        <option value="3">3 guests</option>
                                        <option value="4">4 guests</option>
                                    </select>
                                </div>
                                <button type="button" className="btn btn-danger w-100">Check availability</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default DetailsContent;
