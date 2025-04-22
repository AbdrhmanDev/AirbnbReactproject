import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import TripCard from '../tripCard/TripCard';
import { getUserTripThunk } from '../../services/Slice/trip/Trip';

function Trip() {
    const navigate = useNavigate();
    const tripData = useSelector((state) => state.UserTrip.trip) || [];
    const isLoading = useSelector((state) => state.UserTrip.isLoading);
    const isError = useSelector((state) => state.UserTrip.isError);
    const errorMessage = useSelector((state) => state.UserTrip.errorMessage);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserTripThunk())
    }, [dispatch])
    const navigateToHome = () => {
        navigate('/');
    };

    if (isError) {
        return (
            <div className="container-fluid py-5 text-center">
                <h4 className="text-danger">Error: {errorMessage}</h4>
                <button className="btn btn-primary mt-3" onClick={navigateToHome}>
                    Go Back to Home
                </button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="container-fluid py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (tripData && tripData.length > 0) {
        return (
            <>
                <div className='container p-5'>
                    <h3 className="h2 fw-bold mb-4">Your Trips</h3>
                    <hr className="mb-4" />
                    <TripCard tripData={tripData} isLoading={isLoading} isError={isError} errorMessage={errorMessage} />
                </div>
            </>
        );
    }

    return (
        <div className="container-fluid py-5">
            <div className="row px-5">
                <div className="col-12">
                    <h3 className="h2 fw-bold mb-4">Trips</h3>
                    <hr className="mb-2" />

                    <div className="py-4 text-center">
                        <h2 className="h4 mb-3">No trips booked...yet!</h2>
                        <p className="text-muted fs-6 mb-4">
                            Time to dust off your bags and start planning your next adventure
                        </p>

                        <button
                            className="btn btn-light border border-dark rounded-pill px-3 py-2 fw-semibold fs-6"
                            onClick={navigateToHome}
                        >
                            Start searching
                        </button>
                    </div>
                    <hr className="mb-2" />

                    <div className="mt-4 text-center">
                        <span className="text-muted me-2 fs-6">Can't find your reservation here?</span>
                        <Link to={'/'} className="text-dark fw-semibold text-decoration-underline fs-6">
                            Visit the Help Center
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trip;