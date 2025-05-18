import React, { useEffect, useState } from 'react'
import { Card, Button, ToastContainer } from 'react-bootstrap';
import './ConfirmBooking.css'
import { differenceInDays, format, parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { BookingByIdThunk } from '../../../services/Slice/Booking/GetBookingById';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MdOutlineBedroomParent } from "react-icons/md";
import { PiPath } from "react-icons/pi";
import { LuBedSingle } from "react-icons/lu";
import { MdMeetingRoom } from "react-icons/md";
import { MdOutlineAddLocation } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { FaPhone } from "react-icons/fa";
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import { PaymentFirstThunk } from '../../../services/Slice/Payment/Payment';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteUserTripThunk, getPaymentIdThunk } from '../../../services/Slice/Trip';
import Reviews from '../reviews/reviews';
import { CiStar } from "react-icons/ci";
import { Image } from "react-bootstrap";
import { GetByIdThunk } from '../../../services/Slice/reviews/reviewsGetId';
import { RiArrowLeftSLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { Modal } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

import { DeleteReviewsThunk } from '../../../services/Slice/reviews/Deletereviews';
import { updateReviewsThunk } from '../../../services/Slice/reviews/UpdateReview';
const ConfirmBooking = () => {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const idBooking = searchParams.get("id");
    const [Res, setRes] = useState([])
    const dataProperties = Res?.payload?.properties[0].propertyId;
    const datahostId = Res?.payload?.properties[0].hostId;
    const dataBooking = Res?.payload?.properties[0]
    const location = dataProperties?.address?.coordinates;
    const isLoading = useSelector((state) => state.PaymentFirst.isLoading);
    const navigate = useNavigate();
    const idHotel = dataProperties?._id
    const [showReview, setShowReview] = useState(false);
    const [ReviewsGetById, setReviewsGetById] = useState([])
    const [ImageUser, setImageUser] = useState([])
    const [CheckReviews, setCheckReviews] = useState('')
    const [IsPayment, setIsPayment] = useState('')
    const [ReviewId, setReviewId] = useState('')
    const [commentUpdate, setCommentUpdate] = useState('')
    const [ratingUpdate, setRatingUpdate] = useState('')
    const [hover, setHover] = useState(null);
    const [showModal, setShowModal] = useState(false);

    let formattedStart = '';
    let formattedEnd = '';
    let duration = 0;

    let DefaultIcon = L.icon({
        iconUrl: markerIconPng,
        shadowUrl: markerShadowPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    useEffect(() => {
        const getData = async () => {
            const res = await dispatch(GetByIdThunk(idBooking))
            setReviewsGetById(res?.payload[0])
            setCheckReviews(res?.payload)
            setReviewId(res?.payload[0]?._id)
            setCommentUpdate(res?.payload[0]?.comment);
            setRatingUpdate(res?.payload[0]?.rating);
        }
        getData()

    }, [showModal])

    const handelDelteReviews = async () => {
        await dispatch(DeleteReviewsThunk(ReviewId))
        const newRes = await dispatch(GetByIdThunk(idBooking))
        setReviewsGetById(newRes?.payload[0]);
        setCheckReviews(newRes?.payload);
    }
    // console.log(ReviewsGetById);
    const handelUpdateReviews = () => {
        setShowModal(true)
    }
    const handelUpdateDispatch = async ()=>{
        const res = await dispatch(updateReviewsThunk({
            id:ReviewId,
            comment:commentUpdate,
            rating:ratingUpdate
        }))
        if (res?.meta?.requestStatus === 'fulfilled') {
            setShowModal(false)
            toast.success('Update successfully From Reviews')

        }
        
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await dispatch(BookingByIdThunk(idBooking))
            setRes(res)
            setImageUser(res?.payload?.userId?.avatar);
            setIsPayment(res?.payload?.properties[0]?.status)
            console.log("resyjbghj", res?.payload?.properties[0]?.status);
        }
        fetchData()
    }, [])

    const handelConnecttopaypal = async () => {
        try {
            const response = await dispatch(PaymentFirstThunk(idBooking));
            if (response.payload?.approvalUrl) {
                window.open(
                    response.payload.approvalUrl,
                    'PayPal Payment',
                    'width=600,height=600,left=400,top=100'
                );
            } else {
                toast.error('not founded hotel')
            }
        } catch (error) {
            console.error(error)
            alert('Failed to initialize payment. Please try again.');
        }
    }

    const CancelPayment = async () => {
        try {
            const response = await dispatch(getPaymentIdThunk(idBooking));
            const paymentId = response?.payload?.paymentId;
            if (!paymentId) {
                throw new Error("Payment ID not found");
            }
            await dispatch(deleteUserTripThunk(paymentId));
            navigate('/trips')

        } catch (error) {
            console.error("Error cancelling trip:", error);
        }
    }


    if (!Res) {
        return (
            <div>Loading...</div>
        )
    }

    if (dataBooking?.startDate && dataBooking?.endDate) {
        const start = parseISO(dataBooking.startDate);
        const end = parseISO(dataBooking.endDate);
        formattedStart = format(start, 'PPP');
        formattedEnd = format(end, 'PPP');
        duration = differenceInDays(end, start);
    }

    return (
        <>
            <div className="w-75 m-auto ">
                {/* Header */}
                <div className="d-flex  mt-3 justify-content-between align-items-center mb-4">
                    <RiArrowLeftSLine size={'40'} className='bg- bg-body-secondary rounded-circle cursor-pointer'
                        onClick={() => navigate('/Trips')}
                    />
                    <div >
                        <h4>Booking Details</h4>
                    </div>
                </div>

                {/* Status Card */}
                <Card className="mb-4 ">
                    <Card.Body className="d-flex justify-content-between text-center">
                        <div>
                            <div className="fw-bold mb-2">Booking Status</div>
                            {Res?.payload?.properties?.map((prop, index) => (
                                <span className="" key={index}>
                                    {prop.status === 'completed' ? prop.status :
                                        <Link className='border-0 rounded-2 bg-info text-light p-2 text-decoration-none'
                                            onClick={handelConnecttopaypal}
                                            disabled={isLoading}
                                        >
                                            {
                                                isLoading ? 'Loading...' : 'Connect to paypal'
                                            }
                                        </Link>
                                    }
                                </span>
                            ))}
                        </div>
                        <div>
                            <div className="fw-bold">Payment Method</div>
                            {Res?.payload?.properties?.map((prop, index) => (
                                <span className="" key={index}>
                                    {prop.paymentMethod}
                                </span>
                            ))}
                        </div>
                        <div>
                            <div className="fw-bold">Total Price</div>
                            {Res?.payload?.properties?.map((prop, index) => (
                                <span key={index}>
                                    {prop.totalPrice}
                                </span>
                            ))}
                        </div>
                    </Card.Body>
                </Card>

                <div className="row ">
                    {/* Property Card */}
                    <div className="col-md-6 mb-4">
                        {/*  src={dataProperties.images[0]} */}
                        <Card>
                            <Card.Header>Property Details</Card.Header>
                            <img alt="Property" src={dataProperties?.images[0]} className="card-img-top my-2 p-2 rounded-4 " height={'350px'} />
                            <div className='d-block w-100  d-lg-flex justify-content-center '>
                                <img src={dataProperties?.images[1]} alt="" className='w-sm-100 p-2 rounded-4' width={'146'} height={'130px'} />
                                <img src={dataProperties?.images[2]} alt="" className='w-sm-100 p-2 rounded-4' width={'146'} height={'130px'} />
                                <img src={dataProperties?.images[3]} alt="" className='w-sm-100 p-2 rounded-4' width={'146'} height={'130px'} />
                                <img src={dataProperties?.images[4]} alt="" className='w-sm-100 p-2 rounded-4' width={'146'} height={'130px'} />

                            </div>
                            <Card.Body>
                                <h4>{dataProperties?.title}</h4>
                                <div className='d-flex  '>
                                    <p className='pe-4 '>
                                        <MdOutlineBedroomParent className='m-1 mb-1' />
                                        bedrooms {dataProperties?.spaceDetails?.bedrooms}
                                    </p>
                                    <p className='pe-4'>
                                        <PiPath className='m-1 mb-1' />
                                        path {dataProperties?.spaceDetails?.path}
                                    </p>
                                    <p className='pe-4'>
                                        <LuBedSingle className='m-1 mb-1' />

                                        beds {dataProperties?.spaceDetails?.beds}
                                    </p>
                                    <p className='pe-4'>
                                        <MdMeetingRoom className='m-1 mb-1' />
                                        rooms {dataProperties?.spaceDetails?.rooms}
                                    </p>
                                </div>
                                <div className='d-flex '>
                                    <p className='me-5'>
                                        <MdOutlineAddLocation className='m-1 mb-2' />
                                        {dataProperties?.address?.city}
                                    </p>
                                    <p className='ms-2'>
                                        <MdLocationOn className='m-1 mb-2' />
                                        {dataProperties?.address?.fullAddress}
                                    </p>
                                </div>
                                <hr />
                                <div>
                                    {Res?.payload?.properties?.map((prop, index) => (
                                        <span className="" key={index}>
                                            <p>
                                                Thank you for using our platform. Your reservation has been confirmed, and we hope you enjoy your stay.If you encounter any problems or have any questions, please feel free to contact us at 29864663
                                            </p>
                                            {prop.status === 'completed' &&
                                                <button className='border-0 rounded-2 bg-danger mt-2 text-light p-2'
                                                    onClick={CancelPayment}
                                                    disabled={isLoading}
                                                >
                                                    {
                                                        isLoading ? 'Loading...' : 'CancelPayment'
                                                    }
                                                </button>
                                            }

                                        </span>
                                    ))}
                                </div>
                                <div className="mt-3">
                                    <Button variant="link">
                                        View Property
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Booking Info Card */}
                    <div className="col-md-6 mb-5   ">
                        <Card>
                            <Card.Header>Booking Information</Card.Header>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <strong>Check-in</strong>
                                        <div>{formattedStart}</div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <strong>Check-out</strong>
                                        <div>{formattedEnd}</div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <strong>Duration</strong>
                                        <div>{duration} nights</div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <strong>Guests</strong>
                                        <div> {dataBooking?.companions}</div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <strong>Pets Allowed</strong>
                                        <div>
                                            {dataBooking?.petsAllowed ?
                                                'Animals are allowed' : 'No animals allowed'
                                            }</div>
                                    </div>
                                </div>

                                {/* Guest Info */}

                                <>
                                    <hr />
                                    <h5>Host Information</h5>
                                    <div className="d-flex align-items-center gap-3">
                                        <img
                                            src={datahostId?.avatar}
                                            alt="Guest"
                                            className="rounded-circle"
                                            width="60"
                                            height="60"
                                        />
                                        <div>
                                            <p className="mb-1">{datahostId?.name}</p>
                                            <p className="mb-1">Role {datahostId?.role}</p>
                                            <p className="mb-2">  <FaPhone /> {
                                                datahostId?.phone ? datahostId?.phone : ' Phone  Not available'
                                            }</p>
                                            
                                        </div>
                                    </div>
                                </>
                                {/* Host Info */}

                                <>
                                    <hr />
                                    <h5>Location</h5>
                                    <div className="d-flex align-items-center gap-3">
                                        {Array.isArray(location) && location.length === 2 && (
                                            <MapContainer center={[location[1], location[0]]} zoom={13} style={{ height: '300px', width: '100%' }} className='rounded-2'>
                                                <TileLayer
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                />
                                                <Marker position={[location[1], location[0]]}>
                                                    <Popup>{dataProperties?.title}</Popup>
                                                </Marker>
                                            </MapContainer>
                                        )}
                                    </div>

                                </>
                            </Card.Body>
                        </Card>
                        {
                            IsPayment === 'completed' && CheckReviews.length == 0 &&
                            <button className="btn btn-dark w-100 mt-3 cursor-pointer" onClick={() => setShowReview(true)}>Add Reviews</button>
                        }
                    </div>
                </div>

                <Reviews show={showReview} onClose={() => setShowReview(false)}
                    idBooking={idBooking} idHotel={idHotel}
                />

                {
                    IsPayment === 'completed' && CheckReviews.length === 1 &&
                    <>

                        <div className="rounded-3 text-center w-75 m-auto pt-4 pb-4 mt-4 review-bg text-white">
                            <div className='w-100  text-end '>

                                <MdDelete className='me-2 cursor-pointer' onClick={handelDelteReviews} size={'25'} />
                                <BiSolidEdit className='me-5 cursor-pointer' size={'25'} onClick={handelUpdateReviews} />
                            </div>
                            <h2 className="fw-bold mb-2">Word from our customers</h2>
                            {new Date(ReviewsGetById?.updatedAt).toLocaleDateString('En-en', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                            <div className="review-card mx-auto bg-white text-dark p-4 rounded shadow position-relative">
                                <Image
                                    src={ImageUser}
                                    roundedCircle
                                    className="review-img border border-3 border-white"
                                />
                                <p className="text-gray-700 text-sm">{ReviewsGetById?.comment}</p>
                                <div className="arrow-down"></div>
                            </div>
                            <div className="flex text-yellow-500">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <CiStar key={i} fill={i < ReviewsGetById?.rating ? "#facc15" : "none"} />
                                ))}
                            </div>
                        </div>
                    </>
                }

                {/* Action Buttons */}
                <ToastContainer></ToastContainer>
            </div >
            {
                showModal &&
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Body className="text-center">
                        <h5 className="mb-4">Reviews The Hotel</h5>
                        <div className="mb-3">
                            {[...Array(5)].map((_, index) => {
                                const starValue = index + 1;
                                return (
                                    <FaStar
                                        key={starValue}
                                        size={30}
                                        onClick={() => setRatingUpdate(starValue)}
                                        onMouseEnter={() => setHover(starValue)}
                                        onMouseLeave={() => setHover(null)}
                                        color={starValue <= (hover || ratingUpdate) ? "#ffc107" : "#e4e5e9"}
                                        style={{ cursor: "pointer", transition: "color 200ms" }}
                                    />
                                );
                            })}
                        </div>
                        <textarea
                            className="form-control mb-3"
                            placeholder="Add your Reviews"
                            value={commentUpdate}
                            onChange={(e) => setCommentUpdate(e.target.value)}
                            style={{ height: '100px', resize: 'none' }}
                        />
                        <Button onClick={handelUpdateDispatch} variant="dark" className="w-100 rounded-pill">
                            send
                        </Button>
                    </Modal.Body>
                </Modal>
            }
        </>
    )
}

export default ConfirmBooking