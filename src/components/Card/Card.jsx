import React, { useState } from 'react';
import './Card.css';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
const Card = () => {
    const cards = Array.from({ length: 9 });
    const images = [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1074625301924628531/original/3fc5ccb2-40fd-4182-b5f2-74c1ffec363f.jpeg?im_w=1200",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1083334088822348718/original/dc93f028-5f3d-43a7-a036-1b659022cea6.jpeg?im_w=1200",
        "https://a0.muscache.com/im/pictures/bc6bfeeb-7960-44db-b1f0-7d6ac2bce8bd.jpg?im_w=1200"
    ];

    return (
        <div className="container mt-4">
            <div className="d-flex flex-wrap justify-content-start gap-3">
                {cards.map((_, index) => (
                    <ImageCard key={index} images={images} />
                ))}
            </div>
        </div>
    );
};

const ImageCard = ({ images }) => {
    const [current, setCurrent] = useState(0);

    const handleNext = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="card-container" style={{ flex: '1 0 calc(19% - 12px)', minWidth: '220px', maxWidth: '250px' }}>
            <div className="mx-auto" style={{ overflow: 'hidden' }}>
                <div className="position-relative">
                    <img  src={images[current]} alt="Slide" className="carousel-img"/>

                    {/* Controls */}
                    <div className="cursor-icons-all">
                        <button className="carousel-control-prev" onClick={handlePrev}>
                            <FaAngleLeft className="cursor-icons2" />
                        </button>
                        <button className="carousel-control-next" onClick={handleNext}>
                            <FaAngleRight className="cursor-icons" />
                        </button>
                    </div>

                    {/* Dots */}
                    <div className="dots-container">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${current === index ? 'active' : ''}`}
                                onClick={() => setCurrent(index)}
                            ></span>
                        ))}
                    </div>

                    {/* Badges */}
                    <span className="badge bg-light text-dark position-absolute top-0 start-0 m-2 px-2 py-1">Guest favorite</span>
                    <span className="position-absolute top-0 end-0 m-2 fs-5">
                    <CiHeart style={{color:"wheat"}} size={"24px"}/>
                    </span>
                </div>

                {/* Card Content */}
                <div className="d-flex mt-1">
                    <div className="card-body text-start">
                        <h6 className="card-title pt-1">São Paulo, Brazil</h6>
                        <p className="card-text text-muted mb-1">10,166 kilometers away</p>
                        <p className="card-text text-muted mb-1">May 4 – 9</p>
                        <p className="card-text mb-1">$47 night</p>
                    </div>
                    <div className="review">
                        <p className="mb-0">★ 5.0</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
