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


  return (
    <>
     
      <div className=" navbar-fixed">
      <Navbar/>
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