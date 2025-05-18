import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserTripThunk } from '../../services/Slice/Trip';
import TripCard from './TripCard';
import Navbar from '../Navbar/Navbar';

function Trip() {
    const navigate = useNavigate();
    const tripData = useSelector((state) => state.UserTrip.trip) || [];
    const isLoading = useSelector((state) => state.UserTrip.isLoading);
    const isError = useSelector((state) => state.UserTrip.isError);
    const errorMessage = useSelector((state) => state.UserTrip.errorMessage);
    const dispatch = useDispatch()
    const Payment = useSelector((state) => state.PaymentFirst.Payment) || [];

    useEffect(() => {
        dispatch(getUserTripThunk());
    }, [dispatch]);
    const navigateToHome = () => {
        navigate('/');
    };

    useEffect(() => {
        const handleFocus = () => {
            dispatch(getUserTripThunk());
        };

        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [dispatch]);

    const completedTrips = tripData.filter(trip =>
        trip.properties?.some(property => property.status === 'completed')
    );
    const PendingTrips = tripData.filter(trip =>
        trip.properties?.some(property => property.status === 'pending')
    );

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
                <div className="w-100">
                    <Navbar />
                </div>
                <div className='container p-3'>
                    <h3 className="h2 fw-bold mb-4">Your Trips</h3>
                    <hr className="mb-4" />
                    {completedTrips.length > 0 ? (
                        <TripCard tripData={completedTrips} isLoading={isLoading} isError={isError} errorMessage={errorMessage} />
                    ) : (
                        <div className="py-4 text-center">
                            <h2 className="h4 mb-3">No completed trips found.</h2>
                            <p className="text-muted fs-6 mb-4">
                                You haven't completed any trips yet.
                            </p>
                            <button
                                className="btn btn-light border border-dark rounded-pill px-3 py-2 fw-semibold fs-6"
                                onClick={navigateToHome}
                            >
                                Start searching
                            </button>
                        </div>
                    )}
                </div>

                <div className='container p-3 mb-5 d-block '>
                    <h2 className='h2 fw-bold mb-4  text-center'>Pending <br/> Trips</h2>
                    {/* <hr className="mb-4" /> */}
                    {PendingTrips.length > 0 ? (
                        <TripCard tripData={PendingTrips} isLoading={isLoading} isError={isError} errorMessage={errorMessage} />
                    ) : (
                        <div className="py-4 text-center">
                            <h2 className="h4 mb-3">No completed trips found.</h2>
                            <p className="text-muted fs-6 mb-4">
                                You haven't completed any trips yet.
                            </p>
                            <button
                                className="btn btn-light border border-dark rounded-pill px-3 py-2 fw-semibold fs-6"
                                onClick={navigateToHome}
                            >
                                Start searching
                            </button>
                        </div>
                    )}
                </div>
            </>
        );
    }

    return (
        <>

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
        </>
    );
}

export default Trip;