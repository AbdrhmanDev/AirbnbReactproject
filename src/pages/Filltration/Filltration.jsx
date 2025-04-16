import React from 'react';
import { useSelector } from 'react-redux';
import Category from '../../components/Categoryes/Category';
import Card from '../../components/Card/Card';

const Filltration = () => {
  const filterByPrice = useSelector((state) => state.FilterByPrice.Filter);
  const filterByAddress = useSelector((state) => state.FilterAddress.FilterAddress);

  const isLoadingPrice = useSelector((state) => state.FilterByPrice.isLoading);
  const isErrorPrice = useSelector((state) => state.FilterByPrice.isError);
  const errorPrice = useSelector((state) => state.FilterByPrice.errorMessage);

  const isLoadingAddress = useSelector((state) => state.FilterAddress.isLoading);
  const isErrorAddress = useSelector((state) => state.FilterAddress.isError);
  const errorAddress = useSelector((state) => state.FilterAddress.errorMessage);

  let filteredRooms = [];

  if (filterByAddress.length > 0) {
    filteredRooms = filterByAddress;
  } else if (filterByPrice.length > 0) {    
    filteredRooms = filterByPrice;
  }

  const isLoading = isLoadingPrice || isLoadingAddress;
  const isError = isErrorPrice || isErrorAddress;
  const errorMessage = errorPrice || errorAddress;

  return (
    <>
      <Category />
      <p className='mt-3 ms-5 w-75 m-auto'>{filterByAddress.length} places</p>
        <Card
        hotelData={filteredRooms}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
      />
     
    </>
  );
};

export default Filltration;
