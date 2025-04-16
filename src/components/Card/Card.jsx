import React, { useState, useEffect } from 'react';
import './Card.css';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import CatalogMagic from '../Loader/Loader';
import { addwishlistPost } from '../../services/Slice/Wishlist/AddWishlist';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DeleteWishlistThunk } from '../../services/Slice/Wishlist/DeleteWishlist';
import { getwishlistThunk } from '../../services/Slice/Wishlist/GetWishlist';
import { FiHeart } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
const Card = ({ hotelData, isLoading, isError, errorMessage }) => {
    return (
        <div className="container mt-2 p-1">
            <ToastContainer position="top-center" autoClose={2000} />
            {isLoading ? (
                <CatalogMagic />
            ) : isError ? (
                <p className="text-center text-danger">{errorMessage}</p>
            ) : (
                <div className="d-flex flex-wrap justify-content-start gap-3">
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
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.WishlistGet.get); // Assuming this contains an array of wishlist hotels
    const navigate = useNavigate();

    if (!hotel || !hotel.images || hotel.images.length === 0) return null;

    const { images, title, pricePerNight, rating, address, _id } = hotel;

    const handleNext = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    // ✅ Toggle wishlist on click
    const toggleWishlist = (e,id) => {
        e.stopPropagation();
        if (isWished) {
            dispatch(DeleteWishlistThunk(id));
            setIsWished(false);
            toast.info(
                <div className="toast-content">
                    <img src={images[0]} alt="wishlist" className="toast-img" />
                    <span>Removed from wishlist: <strong>{title}</strong></span>
                </div>,
                {
                    position: "bottom-left",
                    autoClose: 2500,
                    theme: "light",
                    className: "custom-toast",
                }
            );
            dispatch(getwishlistThunk())
        } else {
            dispatch(addwishlistPost(id));
            setIsWished(true);
            toast.success(
                <div className="toast-content">
                    <img src={images[0]} alt="wishlist" className="toast-img" />
                    <span>Saved to wishlist: <strong>{title}</strong></span>
                </div>,
                {
                    position: "bottom-left",
                    autoClose: 2500,
                    theme: "light",
                    className: "custom-toast",
                }
            );
            dispatch(getwishlistThunk())
        }
    };

    // ✅ Check if hotel already in wishlist
    useEffect(() => {
        if (wishlist && Array.isArray(wishlist)) {
            const isAlreadyWished = wishlist.some((item) => item._id === _id);
            setIsWished(isAlreadyWished);
        }
    }, [wishlist, _id]);

  

    return (
        <div className="card-container" 
        style={{ flex: '1 0 calc(19% - 12px)', minWidth: '220px', maxWidth: '250px' }}
        onClick={()=>{navigate(`/details/${_id}`)}}
        >
            <div className="mx-auto" style={{ overflow: 'hidden' }}>
                <div className="position-relative">
                    <img src={images[current]} alt="Slide" className="carousel-img" />

                    <div className="cursor-icons-all">
                        <button className="carousel-control-prev" onClick={handlePrev}>
                            <FaAngleLeft className="cursor-icons2" />
                        </button>
                        <button className="carousel-control-next" onClick={handleNext}>
                            <FaAngleRight className="cursor-icons" />
                        </button>
                    </div>

                    <div className="dots-container">
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
                        <FiHeart 
                            style={{ color: isWished ? "red" : "wheat", cursor: "pointer" }}
                            onClick={(e) => toggleWishlist(e,_id)}
                        />
                    </span>
                </div>

                <div className="d-flex mt-1">
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
        </div>
    );
};

export default Card;
