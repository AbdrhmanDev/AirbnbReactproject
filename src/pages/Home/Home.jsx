import React, { useEffect, useState } from 'react'
import Category from '../../components/Categoryes/Category'
import Card from '../../components/Card/Card'
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';

import { useNavigate } from 'react-router-dom';
import './Home.css'
const Home = () => {
  const { allHotels, filteredHotels, isLoading, isError, errorMessage } = useSelector((state) => state.Hotel);
  const [hotelData, setHotelData] = useState([])
  const navigate= useNavigate()

  useEffect(() => {
    if (filteredHotels?.length > 0) {
      setHotelData(filteredHotels);
    } else {
      setHotelData(allHotels);
    }
  }, [filteredHotels, allHotels]);

  const handelSetInterval = () => {
    navigate('/chat')
  }

  return (
    <>
      <div className=" navbar-fixed">
        <Navbar />
        <Category />
      </div>
      <Card
        hotelData={hotelData}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
      />
      <div
        className="text-end me-5 pe-4 cursor"
        onClick={handelSetInterval}
        style={{
          position: 'fixed',
          top: '85%',
          right: '20px',
          zIndex: 1000,
           cursor: 'pointer'
        }}
      >
        <img
          className="rounded-circle pulsing-img"
          width="50"
          src="https://www.theriver.asia/wp-content/uploads/2020/01/pngkey.com-airbnb-logo-png-605967.png"
          alt="Fixed Logo"
        />
      </div>


    </>
    
  )
  
}

export default Home