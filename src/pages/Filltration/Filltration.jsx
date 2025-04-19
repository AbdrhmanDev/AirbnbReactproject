import React from 'react';
import { useSelector } from 'react-redux';
import Category from '../../components/Categoryes/Category';
import Card from '../../components/Card/Card';

const Filltration = () => {
  const filterByPrice = useSelector((state) => state.GetAllFilter.AllFilter);

  const isLoadingPrice = useSelector((state) => state.GetAllFilter.isLoading);
  const isErrorPrice = useSelector((state) => state.GetAllFilter.isError);
  const errorPrice = useSelector((state) => state.GetAllFilter.errorMessage);

  
 

  return (
    <>
      <Category />
      <p className=' ms-5 w-75 m-auto'>{filterByPrice?.length || 0} places</p>
        <Card
        hotelData={filterByPrice}
        isLoading={isLoadingPrice}
        isError={isErrorPrice}
        errorMessage={errorPrice}
      />
     
    </>
  );
};

export default Filltration;
