import React, { useState } from 'react'
import './Details.css'
import { CiHeart } from "react-icons/ci";
import { IoShareOutline } from "react-icons/io5";
import ShowAllImage from './ShowAllImage/ShowAllImage';

const NavImage = ({ title, images }) => {
    const [showImages, setShowImages] = useState(false);

    const ShowAllImages = () => {
        setShowImages(true);
    };

    return (
        <>
            <div className="container-fluid">
                <div className='row'>
                    <div className="flex-column col-12 position-relative se1">
                        {/* title */}
                        <nav className="d-flex flex-wrap align-items-center justify-content-between ">
                            <div className="flex-grow-1">
                                <h4 className="m-0 text-truncate ">
                                    {title}
                                </h4>
                                <h2 className="flex-grow-1 d-md-none">
                                    <button className="btn border-0">&lt; Homes</button>
                                </h2>
                            </div>
                            <div className="d-flex align-items-center flex-shrink-0 ms-3">
                                <button type="button" className="btn btn-hover px-3 py-2 me-2 d-flex align-items-center">
                                    <i className="fa-solid fa-arrow-up-from-bracket fa-lg star"></i>
                                    <span className="ms-1 text-decoration-underline d-none d-sm-inline">
                                        <IoShareOutline size={"18px"} className='mb-1 ms-5' /> Share</span>
                                </button>
                                <button type="button" className="btn btn-hover px-3 py-2 d-flex align-items-center">
                                    <i className="far fa-heart fa-lg heart-icon star"></i>
                                    <span className="ms-1 text-decoration-underline d-none d-sm-inline">
                                        <CiHeart size={"22px"} /> Save</span>
                                </button>
                            </div>
                        </nav>

                        {/* images */}
                        <div className="row imgs">
                            <div className="col-6 g-2">
                                <img src={images?.[0]} role="button" className="rounded-start-3 img-fluid imgOpacity" />
                            </div>
                            <div className="col-3 flex-column g-2">
                                <div className="mb-1">
                                    <img src={images?.[1]} role="button" className="img-fluid imgOpacity" />
                                </div>
                                <div>
                                    <img src={images?.[2]} role="button" className="img-fluid imgOpacity" />
                                </div>
                            </div>
                            <div className="col-3 flex-column g-2 ">
                                <div className="mb-1">
                                    <img src={images?.[3]} role="button" className="img-fluid rounded-end-3 imgOpacity" />
                                </div>
                                <div>
                                    <img src={images?.[4]} role="button" className="img-fluid rounded-end-3 imgOpacity" />
                                </div>
                                <button type="button" onClick={ShowAllImages}
                                    className="btn btn-light border-2 border-black border-opacity-50 img-bu">
                                    <i className="fa-solid fa-border-none"></i>
                                    <span className=" ms-1 ">Show all photos</span>
                                </button>
                            </div>
                        </div>

                        {/* Show All Images component */}
                        {showImages && <ShowAllImage />}

                    </div>
                </div>
            </div>
        </>
    )
}

export default NavImage;
