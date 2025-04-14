
import './App.css'
import RoutesPage from './routes/RoutesPage'

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategoryAsync } from './services/Slice/Category';
import { fetchAllHotelAsync } from './services/Slice/Hotel';

import PhoneOtpComponent from './components/Login/PhoneNumberForm'
import Card from './components/Card/Card.jsx'
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
    
 <PhoneOtpComponent></PhoneOtpComponent>

    {/* <Card/> */}
    <div id="recaptcha-container"></div>
    </>
  )
}

export default App
