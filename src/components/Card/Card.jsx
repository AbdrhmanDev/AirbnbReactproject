import React, { useState, useEffect } from 'react';
import './Card.css';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import CatalogMagic from '../Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiHeart } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { toggleWishlist } from '../wishlistHelpers/wishlistHelpers';
import ModalLogin from '../Login/ModalLogin';
import { emitter } from '../../features/emitter';
import { getwishlistThunk } from '../../services/Slice/Wishlist/GetWishlist';


import { useLocation } from 'react-router-dom';
const Card = ({ hotelData, isLoading, isError, errorMessage }) => {

    const location = useLocation();
    //  wishlistPage = location.pathname === '/wishlist';
   const wishlistPage = (location.pathname === '/wishlist' || location.pathname === '/Filter')
    return (
        <div className="container  mt-5 p-1">
            <ToastContainer position="top-center" autoClose={2000} />
            {isLoading ? (
                <CatalogMagic />
            ) : isError ? (
                <p className="text-center text-danger">{errorMessage}</p>
            ) : (
                <div className={`d-flex flex-wrap justify-content-start gap-3 ${wishlistPage ? "" : "setCard"}`}>
                    {hotelData?.length > 0 ? (
                        hotelData?.map((hotel, index) => (
                            <ImageCard key={index} hotel={hotel} />
                        ))
                    ) : (
                        <p className="text-center text-muted">No hotels available in this category</p>
                    )}
                </div>
            )}
        </div>
    );
};

const ImageCard = ({ hotel }) => {
    const [current, setCurrent] = useState(0);
    const [isWished, setIsWished] = useState(false);
    const dispatch = useDispatch()
    const wishlist = useSelector((state) => state.WishlistGet.get); // Assuming this contains an array of wishlist hotels
    const navigate = useNavigate();
    var auth = useSelector((state) => state.auth.token)

    const { images, title, pricePerNight, rating, address, _id } = hotel;

    if (!hotel || !hotel.images || hotel.images.length === 0) return null;

    const handleNext = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };
    useEffect(() => {
        if (!auth) {
            setIsWished(false);
        }
    }
    )
    useEffect(() => {

        if (wishlist && Array.isArray(wishlist)) {
            const isAlreadyWished = wishlist.some((item) => item._id === _id);
            setIsWished(isAlreadyWished);
        }
    }, [wishlist, _id]);

    const handlePrev = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="card-container"
            style={{ flex: '1 0 calc(19% - 12px)', minWidth: '220px', maxWidth: '250px' }}
        >
            <div className="mx-auto" style={{ overflow: 'hidden' }}>
                <div className="position-relative">
                    <img src={images[current]} alt="Slide" className="carousel-img cursor-pointer"
                        onClick={() => { navigate(`details/${_id}`) }}
                    />

                    <div className="cursor-icons-all">
                        <button className="carousel-control-prev" onClick={handlePrev}>
                            <FaAngleLeft className="cursor-icons2" />
                        </button>
                        <button className="carousel-control-next" onClick={handleNext}>
                            <FaAngleRight className="cursor-icons" />
                        </button>
                    </div>

                    <div className="dots-container"

                    >
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${current === index ? 'active' : ''}`}
                                onClick={() => setCurrent(index)}
                            ></span>
                        ))}
                    </div>

                    <span className="badge bg-light text-dark position-absolute top-0 start-0 m-2 px-2 py-1">Guest favorite</span>
                    <span className="position-absolute top-0 end-0 m-2 fs-5">
                        {
                            auth ?
                                <FiHeart
                                    style={{ color: isWished ? "red" : "wheat", cursor: "pointer" }}
                                    onClick={(e) => {
                                        dispatch(getwishlistThunk())
                                        e.stopPropagation();
                                        setIsWished((prev) => !prev);
                                        toggleWishlist({
                                            isWished,
                                            dispatch,
                                            hotelId: _id,
                                            hotelTitle: title,
                                            hotelImages: images,
                                            setIsWished,
                                        });
                                    }} />
                                :
                                <FiHeart
                                    style={{ color: isWished ? "red" : "wheat", cursor: "pointer" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        emitter.emit('open-modal');
                                    }} />
                        }
                    </span>
                </div>
                <div className="d-flex mt-1 cursor-pointer"
                    onClick={() => { navigate(`details/${_id}`) }}
                >
                    <div className="card-body text-start">
                        <h6 className="card-title pt-1">{title}</h6>
                        <p className="card-text text-muted mb-1">{address?.city}, {address?.country}</p>
                        <p className="card-text text-muted mb-1">May 4 – 9</p>
                        <p className="card-text mb-1">${pricePerNight} / night</p>
                    </div>
                    <div className="review">
                        <p className="mb-0">★ {rating}</p>
                    </div>
                </div>
            </div>
            <ModalLogin />
        </div>

    );
};

export default Card;
