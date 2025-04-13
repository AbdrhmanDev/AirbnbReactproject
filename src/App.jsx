import './App.css'
import RoutesPage from './routes/RoutesPage'

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategoryAsync } from './services/Slice/Category';
import { fetchAllHotelAsync } from './services/Slice/Hotel';

function App() {
  const dispatch=  useDispatch()
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchCategoryAsync())
    dispatch( fetchAllHotelAsync())
  }, [dispatch])
  return (
    <>
    <RoutesPage/>
    </>
  )
}

export default App
