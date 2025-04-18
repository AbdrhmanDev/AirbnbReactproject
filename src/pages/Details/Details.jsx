import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetHotelByIdThunk } from '../../services/Slice/HotelById';
import { useParams } from 'react-router-dom';
import NavImage from '../../components/Details/NavImage';
import DetailsContent from '../../components/Details/DetailsContent';
import Information from '../../components/Details/information';
import MetaInformation from '../../components/Details/MetaInformation';
import Thingstoknow from '../../components/Details/Thingstoknow';
import { ClipLoader } from 'react-spinners';
// import './Details.css'
const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const HotelById = useSelector((state) => state.HotelByID.getById)||[] ;
  const isLoading = useSelector((state) => state.HotelByID.isLoading);
  const isError = useSelector((state) => state.HotelByID.isError);
  const errorMessage = useSelector((state) => state.HotelByID.errorMessage);

  const {
    title,
    images,
    address,
    createdAt,
    description,
    pricePerNight,
    rating,
    rooms,
    status
  } = HotelById;

  console.log(HotelById);
  useEffect(() => {
    if (id) {
      dispatch(GetHotelByIdThunk(id));
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
        <h3>Loading...</h3>
      </div>
    )
  }
  if (isError) {
    return (
      <div className="text-center py-5 text-danger">
        <h3>Error: {errorMessage || 'Something went wrong.'}</h3>
      </div>
    );
  }
  if (!HotelById || Object.keys(HotelById).length === 0) {
    return (
      <div className="text-center py-5">
        <h3>No data available.</h3>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-75 m-auto">
      <NavImage  title={title} images={images}/>

      <DetailsContent
      address={address} 
      createdAt={createdAt}
      description={description}
      pricePerNight={pricePerNight}
      rating={rating}
      rooms={rooms}
      status={status}
      title={title} 
      />

      <Information />
      <MetaInformation />
      <Thingstoknow />
    </div>
  );
};


export default Details;
