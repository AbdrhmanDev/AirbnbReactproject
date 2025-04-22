import React, { useState } from 'react'
import './Details.css'

const Information = ({ safetyFeatures, cancellationPolicy, houseRules }) => {
    const [showAll, setShowAll] = useState(false);
    const [showSafety,setShowSafety]=useState(false);
    const visibleRules = showAll ? houseRules : houseRules.slice(0, 2);
    const changeArraySafety= Object.entries(safetyFeatures);
    const visibleSafety = showSafety ? changeArraySafety : changeArraySafety.slice(0,2)
    
    return (
        <div className="container mt-3 border-top w-100 d-flex justify-content-between mb-5 pb-4">
            <div className="row w-100 m-3">
                <h3 className="mb-4">Things to know</h3>

                <div className="col-md-4 mb-3 border-bottom">
                    <h5>House rules</h5>
                    {houseRules.length === 0 ? (
                        <p>No house rules fetched</p>
                    ) : (
                        visibleRules.map((item, index) => (
                            <ul className="list-unstyled" key={index}>
                                <li>{item}</li>
                            </ul>
                        ))
                    )}

                    {houseRules.length > 2 && (
                        <button
                            type="button"
                            onClick={() => setShowAll(!showAll)}
                            className="btn-dark border-0 bg-body  p-0 text-decoration-underline"
                        >
                            {showAll ? 'Show less' : 'Show more'}
                        </button>
                    )}
                </div>

                <div className="col-md-4 mb-3 border-bottom">
                    <h5>Safety & property</h5>
                    {
                        Object.keys(safetyFeatures).length === 0 ? <p>No Safety </p> :
                        visibleSafety.map((item, index) =>
                                <ul className="list-unstyled" key={index}>
                                    <li>{item}</li>
                                </ul>
                            )
                    }
                    <button type="button" onClick={()=>setShowSafety(!showSafety)} className="btn-dark border-0 bg-body mb-2 p-0 text-decoration-underline">
                       {showSafety ? " Show Less":" Show More"}
                    </button>
                </div>

                <div className="col-md-4 mb-4  border-bottom">
                    <h5>Cancellation Policy</h5>
                    <ul className="list-unstyled">
                        {
                            cancellationPolicy === " " ? "No Features" : 
                            <li>{cancellationPolicy}</li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Information
