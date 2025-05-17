import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetHotelByIdThunk } from '../../services/Slice/HotelById';
import { useParams } from 'react-router-dom';
import NavImage from '../../components/Details/NavImage';
import DetailsContent from '../../components/Details/DetailsContent';

import MetaInformation from '../../components/Details/MetaInformation';
import Thingstoknow from '../../components/Details/Thingstoknow';
import { ClipLoader } from 'react-spinners';
import Information from '../../components/Details/Information';
import ShowAllImage from '../../components/Details/ShowAllImage/ShowAllImage';
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
    pricePerNight,
    rating,
    status,
    aboutThisSpace,//text
    spaceDetails,//array
    hostId,
    amenities,
    propertyType,
    reviews,
    _id,
    houseRules,
    advantages,
    cancellationPolicy,
    safetyFeatures,
    capacity,
  } = HotelById;
  // console.log(HotelById);
  // console.log("id host",HotelById.hostId._id);
  
  


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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <NavImage  title={title} images={images}  _id={_id}/>

      <DetailsContent
      address={address} 
      pricePerNight={pricePerNight}
      rating={rating}
      status={status}
      title={title} 
      aboutThisSpace={aboutThisSpace}
      spaceDetails={spaceDetails}
      hostId={hostId}
      amenities={amenities}
      propertyType={propertyType}
      images={images}
      advantages={advantages}
      capacity={capacity}
      _id={_id}
      />
      
      <MetaInformation 
      address={address} 
      images={images}

      />
      <Thingstoknow 
      rating={rating}
      hostId={hostId}
      reviews={reviews}
      houseRules={houseRules}
      />
      <Information 
      houseRules={houseRules}
      cancellationPolicy={cancellationPolicy}
      safetyFeatures={safetyFeatures}
      />
    </div>
  );
};


export default Details;
