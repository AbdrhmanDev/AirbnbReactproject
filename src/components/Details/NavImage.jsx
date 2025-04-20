import React, { useState } from 'react'
import './Details.css'
import { CiHeart } from "react-icons/ci";
import { IoShareOutline } from "react-icons/io5";
import ShowAllImage from './ShowAllImage/ShowAllImage';
import Slider from "react-slick";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
const NavImage = ({ title, images }) => {
    const [showImages, setShowImages] = useState(false);

    const navigate= useNavigate();
    const ShowAllImages = () => {
        setShowImages(true);
    };

    return (
        <>
            <div className="container-fluid">
                <div className='row'>
                    <div className="flex-column col-12 position-relative se1">

                        <nav className="d-none d-md-flex flex-wrap align-items-center justify-content-between m-auto w-75 ps-3">
                            <div className="flex-grow-1 ">
                                <h4 className="m-0 text-truncate">{title}</h4>
                            </div>
                            <div className="d-flex align-items-center flex-shrink-0 ms-3">
                                <button type="button" className="btn btn-hover px-3 py-2 me-2 d-flex align-items-center">
                                    <IoShareOutline size={"18px"} className='mb-1 ms-5' />
                                    <span className="ms-1 text-decoration-underline d-none d-sm-inline">Share</span>
                                </button>
                                <button type="button" className="btn btn-hover px-3 py-2 d-flex align-items-center">
                                    <CiHeart size={"22px"} />
                                    <span className="ms-1 text-decoration-underline d-none d-sm-inline">Save</span>
                                </button>
                            </div>
                        </nav>


                        <div className="d-md-none position-relative ">

                            <button className=" btn-light3 homessilder position-absolute  top-0 start-0 m-2 px-2 py-1 fw-bold rounded-pill"
                            onClick={()=>navigate('/')}
                            >
                            <IoIosArrowBack />
                            </button>


                            <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
                                <button className="homessilder btn-light3 px-2 py-1 rounded-circle">
                                    <IoShareOutline size={20} />
                                </button>
                                <button className="homessilder btn-light3 px-2 py-1 rounded-circle">
                                    <CiHeart size={22} />
                                </button>
                            </div>
                        </div>



                        <div className="container py-4 d-none d-md-block w-75">
                            <div className="row g-1">
                                <div className="col-md-6">
                                    <img src={images?.[0]} className="image-box main-left-img w-100 rounded-start" alt="Large" />
                                </div>

                                <div className="col-md-6">
                                    <div className="row g-1">
                                        <div className="col-6">
                                            <img src={images?.[1]} className="image-box p-0" alt="Image 2" />
                                        </div>
                                        <div className="col-6">
                                            <img src={images?.[2]} className="image-box rounded-end p-0" alt="Image 3" />
                                        </div>
                                        <div className="col-6">
                                            <img src={images?.[3]} className="image-box p-0 m-0" alt="Image 4" />
                                        </div>
                                        <div className="col-6 position-relative">
                                            <img src={images?.[4]} className="image-box rounded-end" alt="Image 5" />
                                            <button
                                                className="btn btn-light3 position-absolute bottom-0 end-0 m-2 px-3 py-2 fw-bold rounded-pill"
                                                onClick={ShowAllImages}
                                            >
                                                Show all photos
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="d-block d-md-none w-100" style={{ height: "50vh", overflow: "hidden" }}>
                            <Slider
                                dots={true}
                                infinite={true}
                                speed={500}
                                slidesToShow={1}
                                slidesToScroll={1}
                            >
                                {images?.map((img, i) => (
                                    <div key={i}>
                                        <img
                                            src={img}
                                            className="w-100"
                                            style={{
                                                height: "100vh",
                                                borderRadius: "10px" 
                                            }}
                                            alt={`img-${i}`}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        {showImages && <ShowAllImage />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavImage;
