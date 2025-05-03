import React from 'react'
import IsLogin from '../../components/Payment/IsLogin'
import IsLogout from '../../components/Payment/IsLogout'
// import { useSearchParams } from 'react-router-dom';

const CheckOut = () => {
  // const [searchParams] = useSearchParams();
  // const detailId = searchParams.get("detailId");
  // const title = searchParams.get("title");
  // const image = searchParams.get("image");
  const isLogin = localStorage.getItem('token')
  return (
    
    <>
    {
      isLogin ? <IsLogin/> : <IsLogout/>
    }




    
    
    </>
  )
}

export default CheckOut