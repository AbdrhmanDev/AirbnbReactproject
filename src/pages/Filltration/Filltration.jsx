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

  // تحديد بيانات الفنادق بناءً على الأولوية (العنوان أولاً)
  let filteredRooms = [];

  if (filterByAddress.length > 0) {
    filteredRooms = filterByAddress;
    console.log("addr",filterByAddress);
    
  } else if (filterByPrice.length > 0) {
    console.log("price",filterByPrice);
    
    filteredRooms = filterByPrice;
  }

  const isLoading = isLoadingPrice || isLoadingAddress;
  const isError = isErrorPrice || isErrorAddress;
  const errorMessage = errorPrice || errorAddress;
console.log(filteredRooms);

  return (
    <>
      <Category />

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
