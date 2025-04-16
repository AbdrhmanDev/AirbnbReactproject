import './App.css'
import RoutesPage from './routes/RoutesPage'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategoryAsync } from './services/Slice/Category';
import { fetchAllHotelAsync } from './services/Slice/Hotel';
import { ToastContainer } from 'react-toastify';
import { getwishlistThunk } from './services/Slice/Wishlist/GetWishlist';
import { DeleteWishlistThunk } from './services/Slice/Wishlist/DeleteWishlist';
function App() {
  const dispatch=  useDispatch()
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchCategoryAsync())
    dispatch(fetchAllHotelAsync())
    dispatch(getwishlistThunk())
    
    dispatch
  }, [dispatch])
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <RoutesPage/>
    </>
  )
}

export default App
