import React from 'react'
import  './Details.css'

const Information = () => {
  return (
    <>
   <div className="container mt-5 border-top pt-4">
                <h3 className="mb-4">Things to know</h3>
                <div className="row">

                    <div className="col-md-4 mb-3">
                        <h5>House rules</h5>
                        <ul className="list-unstyled">
                            <li>Flexible check-in</li>
                            <li>Checkout before 12:00PM</li>
                            <li>2 guests maximum</li>
                        </ul>
                        <span>
                            <button type="button" className="btn-dark border-0 bg-body ms-2 p-0  text-decoration-underline">
                                Show more</button> <span></span>
                        </span>
                    </div>


                    <div className="col-md-4 mb-3">
                        <h5>Safety & property</h5>
                        <ul className="list-unstyled">
                            <li>Nearby lake, river, other body of water</li>
                            <li>Climbing or play structure</li>
                            <li>Carbon monoxide alarm</li>
                        </ul>
                        <span>
                            <button type="button" className="btn-dark border-0 bg-body ms-2 p-0  text-decoration-underline">
                                Show more</button> <span></span>
                        </span>
                    </div>


                    <div className="col-md-4 mb-3">
                        <h5>Cancellation policy</h5>
                        <ul className="list-unstyled">
                            <li>Free cancellation before May 9</li>
                            <li>Cancel before check-in on May 14 for a partial </li>
                            <li>Review this Host's full policy for details</li>
                        </ul>
                        <span>
                            <button type="button" className="btn-dark border-0 bg-body ms-2 p-0  text-decoration-underline">
                                Show more</button> <span></span>
                        </span>
                    </div>
                </div>

            </div>
    </>
  )
}

export default Information