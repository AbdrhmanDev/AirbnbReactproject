import React from 'react';
import { useSelector } from 'react-redux';
import Category from '../../components/Categoryes/Category';
import Card from '../../components/Card/Card';

const Filltration = () => {
  const filterByPrice = useSelector((state) => state.AllFilter.AllFilter);

  const isLoadingPrice = useSelector((state) => state.AllFilter.isLoading);
  const isErrorPrice = useSelector((state) => state.AllFilter.isError);
  const errorPrice = useSelector((state) => state.AllFilter.errorMessage);
 

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
