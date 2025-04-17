import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUserTripThunk, getUserTripThunk } from '../../services/Slice/trip/Trip';

const TripCard = ({ tripData, isLoading, isError, errorMessage }) => {
    const navigate = useNavigate();
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

    const { properties } = trip;
    const property = properties[0]?.propertyId; // Get the first property in the trip
    const startDate = new Date(properties[0]?.startDate);
    const endDate = new Date(properties[0]?.endDate);
    const totalPrice = properties[0]?.totalPrice;

    // Check if the trip can be canceled (startDate is in the future)
    const canCancel = startDate > new Date();

    if (!property || !property.images || property.images.length === 0) return null;

    return (
        <div
            className="card-container"
            style={{ flex: '1 0 calc(25% - 12px)', minWidth: '250px', maxWidth: '300px' }}
            onClick={() => console.log("Navigate to trip details")}
        >
            <div className="mx-auto" style={{ overflow: 'hidden' }}>
                <img src={property.images[0]} alt="Property" className="trip-img" />

                <div className="card-body text-start mt-2">
                    <h6 className="card-title fw-bold">{property.title}</h6>
                    <p className="card-text text-muted mb-1">
                        {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                    </p>
                    <p className="card-text text-muted mb-1">
                        Companions: {properties[0]?.companions}
                    </p>
                    <p className="card-text mb-1">
                        <strong>${totalPrice}</strong> total price
                    </p>

                    {/* Cancel button */}
                    {canCancel && (
                        <button
                            className="btn btn-danger btn-sm w-100 mt-2"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click event
                                console.log("Cancel booking for trip ID:", trip._id);
                                dispatch(deleteUserTripThunk(trip._id));
                                dispatch(getUserTripThunk());
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