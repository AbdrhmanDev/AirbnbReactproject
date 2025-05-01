// src/utils/wishlistHelpers.js

import { toast } from 'react-toastify';
import { addwishlistPost } from '../../services/Slice/Wishlist/AddWishlist';
import { DeleteWishlistThunk } from '../../services/Slice/Wishlist/DeleteWishlist';
import { getwishlistThunk } from '../../services/Slice/Wishlist/GetWishlist';

export const toggleWishlist = ({isWished,dispatch,hotelId,hotelTitle,hotelImages,setIsWished,}) => {


  if (isWished) {
    dispatch(DeleteWishlistThunk(hotelId));
    setIsWished(false);
    toast.info(
      <div className="toast-content">
        <img src={hotelImages[0]} alt="wishlist" className="toast-img" />
        <span>Removed from wishlist: <strong>{hotelTitle}</strong></span>
      </div>,
      {
        position: "bottom-left",
        autoClose: 2500,

        className: "custom-toast",
      }
    );
  } else {
    dispatch(addwishlistPost(hotelId))
    setIsWished(true);
    toast.success(
      <div className="toast-content">
        <img src={hotelImages[0]} alt="wishlist" className="toast-img" />
        <span>Saved to wishlist: <strong>{hotelTitle}</strong></span>
      </div>,
      {
        position: "bottom-left",
        autoClose: 2500,
        theme: "light",
        className: "custom-toast",
      }
    );
  }
  console.log("the add");
  
  dispatch(getwishlistThunk());
};
    