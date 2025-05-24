import { useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';

const Filltration = () => {
  const filterByPrice = useSelector((state) => state.GetAllFilter.AllFilter);

  const isLoadingPrice = useSelector((state) => state.GetAllFilter.isLoading);
  const isErrorPrice = useSelector((state) => state.GetAllFilter.isError);
  const errorPrice = useSelector((state) => state.GetAllFilter.errorMessage);

  
 

  return (
    <>
    <Navbar/>
      {/* <p className=' ms-5 w-75 m-auto'>{filterByPrice?.length || 0} places</p> */}
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
