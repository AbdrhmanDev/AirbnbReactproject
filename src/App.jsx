import './App.css'

import RoutesPage from './routes/RoutesPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryAsync } from './services/Slice/Category';
import { fetchAllHotelAsync } from './services/Slice/Hotel';
import { ToastContainer } from 'react-toastify';
import { getwishlistThunk } from './services/Slice/Wishlist/GetWishlist';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const dispatch = useDispatch()
  var auth= useSelector((state)=>state.auth.token)
  var token= localStorage.getItem('token');

  useEffect(() => {
    dispatch(fetchCategoryAsync())
    dispatch(fetchAllHotelAsync())
    
  }, [dispatch])  
  useEffect(()=>{
    if (auth) {
      dispatch(getwishlistThunk())
    }
  },[token])

  
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RoutesPage/>
    </>
  )
}

export default App
