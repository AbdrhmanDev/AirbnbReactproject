import React from 'react'
import './Details.css'
import leftImg from '../../assets/left.png';
import rightImg from '../../assets/right.png';

const DetailsContent = ({ status, title, description, pricePerNight, rating, rooms, createdAt, address }) => {
    return (
        <>
            <div className="row mt-3 pb-5">
                <div className="flex-column col-md-8">
                    <h4>{title}</h4>
                    <span>{status}</span>
                    <span> Private attached bathroom </span>
                    <div className="border rounded-3 border-opacity-25 shadow border-black  mt-5 mb-4 card-innormal"
                        role="button">
                        <div className=" my-3 p-4 row">
                            <div className=" col-3 m-auto ">
                                <img src={leftImg} className="img-sec2" alt="" />
                                <div className="d-inline-block">
                                    <h5 className="m-0">Guest</h5>
                                    <h5 className="m-0">favorite</h5>
                                </div>
                                <img src={rightImg} className="img-sec2 " alt="" />
                            </div>
                            <h5 className="col-5">
                                One of the most loved homes on Airbnb, according to guests
                            </h5>
                            <div className="col-2 flex-column ">
                                <h2 className=" mb-0">4.98</h2>
                                <div>
                                    <i className="fas fa-star star"></i>
                                    <i className="fas fa-star star"></i>
                                    <i className="fas fa-star star"></i>
                                    <i className="fas fa-star star"></i>
                                    <i className="fas fa-star star"></i>
                                </div>
                            </div>
                            <div className="col-2 flex-column  border-start border-opacity-25  border-black">
                                <h2 className="mb-0">{rating}</h2>
                                <div>
                                    <span className="text-decoration-underline">Reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-3 border-opacity-25 shadow border-black  mt-5 mb-4 d-md-none card-inresponsive"
                        role="button">
                        <div className=" my-3 p-4 row">
                            <div className="col m-auto border-end border-opacity-25 ">
                                <img src={leftImg} className="img-sec2" alt="" />
                                <div className="d-inline-block">
                                    <h5 className="m-0">Guest</h5>
                                    <h5 className="m-0">favorite</h5>
                                </div>
                                <img src={leftImg} className="img-sec2 " alt="" />
                            </div>
                            <div className="col flex-column ">
                                <h5 className=" mb-0">{rating}</h5>
                                <div>
                                    <i className="fas fa-star star"></i>
                                    <i className="fas fa-star star"></i>
                                    <i className="fas fa-star star"></i>
                                    <i className="fas fa-star star"></i>
                                    <i className="fas fa-star star"></i>
                                </div>
                            </div>
                            <div className="col flex-column  border-start border-opacity-25  border-black">
                                <h2 className="mb-0">{rating}</h2>
                                <div>
                                    <span className="text-decoration-underline">Reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row border-bottom pb-4">
                        <div className="col-1">
                            <img src="./imgs/user.png" className="rounded-circle userImg" alt="" />
                        </div>
                        <div className="col flex-column">
                            <h5>Stay with Stephane</h5>
                            <div>Superhost 10 years hosting</div>
                        </div>
                    </div>
                    <div className="flex-column">
                        <div className="row  mt-4">
                            <div className="col-1">
                                <img src="./imgs/cap.png" className="rounded-circle userImg" alt="" />
                            </div>
                            <div className="col flex-column">
                                <h5>Top 5% of homes </h5>Guest
                                <div>This home is highly ranked based on ratings, reviews, and reliability. </div>
                            </div>
                        </div>
                        <div className="row  mt-4">
                            <div className="col-1">
                                <img src="./imgs/cap.png" className="rounded-circle userImg" alt="" />
                            </div>
                            <div className="col flex-column">
                                <h5>16-min walk to the lake </h5>
                                <div>This home is by Lac Daumesnil. </div>
                            </div>
                        </div>
                        <div className="row  mt-4 border-bottom pb-4">
                            <div className="col-1">
                                <img src="./imgs/cap.png" className="rounded-circle userImg" alt="" />
                            </div>
                            <div className="col flex-column">
                                <h5>Self check-in </h5>
                                <div>Check yourself in with the lockbox. </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-column">
                        <div className="mt-3 p-1 rounded" style={{backgroundColor:"#F7F7F7"}}>
                            <span className="fs-6">
                                Some info has been automatically translated
                            </span>
                            <span className="fs-6" >
                                <button type="button" style={{fontSize:"14px",backgroundColor:"#F7F7F7"}}
                                    className=" border-0 ms-1 p-0 text-decoration-underline">
                                    Show original</button>
                            </span>
                        </div>
                        <div className="mt-3">
                            <h3>
                                About this place
                            </h3>
                        </div>
                        <div className="mt-4">
                            <span>
                                East of Paris - Saint Mandé
                            </span>
                        </div>
                        <div className="mt-4">
                            <span>
                                Bedroom with private bathroom close from Bois de Vincennes.
                            </span>
                        </div>
                        <div className="mt-4">
                            <div>
                                On line 1 :
                            </div>
                            <div>
                                Louvre (25mn)...
                            </div>
                        </div>
                        <div className="mt-4 border-bottom  pb-4">
                            <span className="fs-5">
                                <button type="button"
                                    className="btn-dark border-0 bg-body ms-2 p-0 fs-6 text-decoration-underline">
                                    Show More</button>
                            </span>
                        </div>
                    </div>
                    <div className="flex-column">
                        <div className="mt-4">
                            <h3 className="">Where you’ll sleep
                            </h3>
                        </div>
                        <div className="mt-4">
                            <img src="imgs/room.png" className="img-room" role="button" alt="" />
                        </div>
                        <div className="mt-4 border-bottom pb-4" role="button">
                            <h3>
                                Badroom
                            </h3>
                            <div>
                                1 queen bed
                            </div>
                        </div>
                    </div>
                    <div className="row border-bottom pb-4">
                        <div className="mt-4">
                            <h4 className="">What this place offers
                            </h4>
                        </div>
                        <div className="mt-4 col-md-5">
                            <i className="fa-solid fa-wifi me-3"></i> <span>asdasdwsda</span>
                        </div>
                        <div className="mt-4 col-7 right-f">
                            <i className="fa-solid fa-wifi me-3"></i> <span>asdasdwsda</span>
                        </div>
                        <div className="mt-2 col-md-5">
                            <i className="fa-solid fa-wifi me-3"></i> <span>asdasdwsda</span>
                        </div>
                        <div className="mt-2 col-7 right-f">
                            <i className="fa-solid fa-wifi me-3"></i> <span>asdasdwsda</span>
                        </div>
                        <div className="mt-2 col-md-5">
                            <i className="fa-solid fa-wifi me-3"></i> <span>asdasdwsda</span>
                        </div>
                        <div className="mt-2 col-7 right-f">
                            <i className="fa-solid fa-wifi me-3"></i> <span>asdasdwsda</span>
                        </div>
                        <div className="mt-2 col-md-5">
                            <i className="fa-solid fa-wifi me-3"></i> <span>asdasdwsda</span>
                        </div>
                        <div className="mt-2 col-7 right-f">
                            <i className="fa-solid fa-wifi me-3"></i> <span>asdasdwsda</span>
                        </div>
                        <div className="mt-3">
                            <button type="button" className="btn  border-black  ms-2 fs-5 hover ">
                                Show all 45 amenities</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mt-4">
                            <h4 className="">Select check-in date
                            </h4>
                        </div>
                        <div>Minimum stay: 2 nights </div>
                        <section className="ftco-section col-10 pb-0">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="calendar-section">
                                            <div className="row no-gutters">
                                                <div className="col-md-6">

                                                    <div className="calendar calendar-first" id="calendar_first">
                                                        <div className="calendar_header">
                                                            <button className="switch-month switch-left">
                                                                <i className="fa fa-chevron-left"></i>
                                                            </button>
                                                            <h2></h2>
                                                            {/* <!-- <button className="switch-month switch-right">
                                                            <i className="fa fa-chevron-right"></i>
                                                        </button> --> */}
                                                        </div>
                                                        <div className="calendar_weekdays"></div>
                                                        <div className="calendar_content"></div>
                                                    </div>

                                                </div>
                                                <div className="col-md-6">

                                                    <div className="calendar calendar-second" id="calendar_second">
                                                        <div className="calendar_header">
                                                            {/* <!-- <button className="switch-month switch-left">
                                                            <i className="fa fa-chevron-left"></i>
                                                        </button> --> */}
                                                            <h2></h2>
                                                            <button className="switch-month switch-right">
                                                                <i className="fa fa-chevron-right"></i>
                                                            </button>
                                                        </div>
                                                        <div className="calendar_weekdays"></div>
                                                        <div className="calendar_content"></div>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                    <span className=""> <i className="fa-regular fa-keyboard fs-4 hover p-2 rounded-circle" role="button"></i>
                    </span>
                </div>

                <div className="container  col-md-4 right-card">
                    <div className="card shadow p-4 position-sticky custom-edit">
                        <h5 className="card-title mb-4">Add dates for prices</h5>
                        <form>
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="Check-In" className="form-label">Check-In</label>
                                    <input type="date" className="form-control" id="Check-In" placeholder="Add date" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="Check-Out" className="form-label">Check-Out</label>
                                    <input type="date" className="form-control" id="Check-Out" placeholder="Add date" />
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
                            <button type="button" className="btn btn-danger  w-100">Check availability</button>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DetailsContent