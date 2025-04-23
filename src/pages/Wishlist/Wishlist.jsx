import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';

const Wishlist = () => {
    const { get, isLoading, isError } = useSelector((state) => state.WishlistGet);
    const [hotelData, setHotelData] = useState([]);


    useEffect(() => {
        setHotelData(get);
    }, [get]);
    
    return (
        <>
        <Navbar/>
            <Card
                hotelData={hotelData}
                isLoading={isLoading}
                isError={isError}
                errorMessage={"Failed to load wishlist hotels"}
            />
        </>
    );
};

export default Wishlist;
