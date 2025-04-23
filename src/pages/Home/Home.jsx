import React, { useEffect, useState } from 'react'
import Category from '../../components/Categoryes/Category'
import Card from '../../components/Card/Card'
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
  const { allHotels, filteredHotels, isLoading, isError, errorMessage } = useSelector((state) => state.Hotel);
  const [hotelData, setHotelData] = useState([])
  
  
  useEffect(() => {
    if (filteredHotels?.length > 0) {
      setHotelData(filteredHotels);
    } else {
      setHotelData(allHotels);
    }
  }, [filteredHotels, allHotels]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [googleCredential, setGoogleCredential] = useState(null);

  useEffect(() => {
    const storedCredential = localStorage.getItem("authToken");
    if (storedCredential) {
      setGoogleCredential(storedCredential);
      setIsLoggedIn(true);
    }
  }, []);


  return (
    <>
      <div className=" navbar-fixed">
      <Navbar 
      isLoggedIn={isLoggedIn} 
      setIsLoggedIn={setIsLoggedIn} 
      setGoogleCredential={setGoogleCredential} 
      />
      <Category />
      </div>
      <Card
        hotelData={hotelData}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default Home