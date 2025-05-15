import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { googleLoginThunk } from '../../services/Slice/Login/GoogleLogin';
import { emitter } from '../../features/emitter';
import { toast } from 'react-toastify';

const LoginWithGoogle = () => {
    const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userProfile.profile) || [];
  
    const handleGoogleLoginSuccess = (credentialResponse) => {
        const idToken = credentialResponse.credential; 
        dispatch(googleLoginThunk({idToken:idToken,email:user?.email,name:user?.name}));  
        emitter.emit('close-modal')
      };
    const handleGoogleLoginFailure = (error) => {
        console.log(`Google Login Failed ${error}`);
        emitter.emit('open-modal')
        toast.error("This is an error message!", {
            position: "top-right",
            autoClose: 3000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true, 
            draggable: true, 
            theme: "light", 
          });
      };
    return (
        <>
            <div className='mt-4'>
                <div className='w-100 d-flex justify-content-center'>
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginFailure}
                    />
                </div>
            </div>
        </>
    )
}

export default LoginWithGoogle