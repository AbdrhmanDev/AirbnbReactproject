import React, { useEffect, useState } from 'react';
import './CardTrips.Module.css';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserTripThunk, getPaymentIdThunk, getUserTripThunk } from '../../services/Slice/Trip';
import { useNavigate } from 'react-router-dom';


const TripCard = ({ tripData, isLoading, isError, errorMessage }) => {
    // const navigate = useNavigate();
    if (isLoading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <p className="text-center text-danger py-5">{errorMessage}</p>
        );
    }

    if (!tripData || tripData.length === 0) {
        return (
            <p className="text-center text-muted py-5">No trips available.</p>
        );
    }

    return (
        <div className="container mt-2 p-1">
            <div className="d-flex flex-wrap justify-content-start gap-3">
                {tripData.map((trip, index) => (
                    <TripItem key={index} trip={trip} />
                ))}
            </div>
        </div>
    );
};

const TripItem = ({ trip }) => {
    const dispatch = useDispatch();
    const navigate= useNavigate()
    const [localTrip, setLocalTrip] = useState(trip);
    useEffect(() => {
        setLocalTrip(trip);
    }, [trip]);
    const hotel = useSelector((state) => state.HotelByID.getById);
    const _id = hotel?._id;
    console.log(hotel);
  
    const { properties } = localTrip;
    const property = properties[0]?.propertyId;
    const startDate = new Date(properties[0]?.startDate);
    const endDate = new Date(properties[0]?.endDate);
    const totalPrice = properties[0]?.totalPrice;
    
    const canCancel = startDate > new Date();

    if (!property || !property.images || property.images.length === 0) return null;

    return (
        <div
            className="card-container3 mb-4"
            style={{ flex: '1 0 calc(25% - 12px)', minWidth: '250px', maxWidth: '300px' }}
            onClick={() => 
                {
                     navigate(`/details/${_id}`)
            }}
        >
            <div className="mx-auto" style={{ overflow: 'hidden' }}>
                <img src={property.images[0]} alt="Property" className="trip-img3" />

                <div className="card-body text-start mt-2">
                    <h6 className="card-title3 fw-bold">{property.title}</h6>
                    <p className="card-text3 text-muted mb-1">
                        {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                    </p>
                    <p className="card-text3 text-muted mb-1">
                        Companions: {properties[0]?.companions}
                    </p>
                    <p className="card-text3 mb-1">
                        <strong>${totalPrice}</strong> total price
                    </p>

                    {canCancel && (
                        <button
                            className="btn btn-danger btn-sm w-100 mt-2"
                            onClick={async (e) => {
                                e.stopPropagation();

                                try {
                                    const response = await dispatch(getPaymentIdThunk(trip._id));

                                    const paymentId = response?.payload?.paymentId;
                                    if (!paymentId) {
                                        throw new Error("Payment ID not found");
                                    }
                                    console.log("Payment ID:", paymentId);

                                    console.log("Cancel booking for trip ID:", trip._id, "Payment ID:", paymentId);

                                    await dispatch(deleteUserTripThunk(paymentId));

                                    await dispatch(getUserTripThunk());

                                } catch (error) {
                                    console.error("Error cancelling trip:", error);
                                }
                            }}

                        >
                            Cancel Booking
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TripCard;