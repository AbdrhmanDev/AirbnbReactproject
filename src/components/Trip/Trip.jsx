import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Trip() {
    const navigate = useNavigate(); 

    const navigateToHome = () => {
        navigate('/'); 
    };
    return (
        <div className='container-fluid py-1'>
            <div className='row px-5'>
                <div className='col-12'>
                    <h3 className='h2 fw-bold mb-4'>Trips</h3>
                    <hr className='mb-2' />

                    <div className='py-4'>
                        <h2 className='h4  mb-3'>No trips booked...yet!</h2>
                        <p className='text-muted fs-6 mb-4'>Time to dust off your bags and start planning your next adventure</p>

                        <button className='btn btn-light border-black rounded-squer px-2 py-2 fw-semibold fs-6' onClick={navigateToHome} >
                            Start searching
                        </button>
                    </div>
                    <hr className='mb-2' />

                    <div className='mt-4 '>
                        <span className='text-muted me-2 fs-6'>Can't find your reservation here?</span>
                        <Link to={'/'} className='text-dark fw-semibold text-decoration-underline fs-6'>Visit the Help Center</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trip