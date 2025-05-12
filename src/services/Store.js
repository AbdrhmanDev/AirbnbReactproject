import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./Slice/Category";
import AllHotelSlice from "./Slice/Hotel";
import AddWishlistSlice from "./Slice/Wishlist/AddWishlist";
import GetWishlistSlice from "./Slice/Wishlist/GetWishlist";
import DeleteWishlistSlice from "./Slice/Wishlist/DeleteWishlist";
import GetHotelByIdSlice from "./Slice/HotelById";
import GetAllFilterSlice from "./Slice/Filter/AllFillter";
import GetUserTripSlice from "./Slice/Trip";
import ProfileSlice from "./Slice/Profile/ProfileAPI";
import ProfileEditSlice from "./Slice/Profile/EditProfileApi";
import authSlice from "./Slice/Login/GoogleLogin";
import BookingHotelSlice from "./Slice/Booking/Booking";
import PaymentFirstSlice from "./Slice/Payment/Payment";
import ExecutePaymentSlice from "./Slice/Payment/ExecutePayment";
import CancelPaymentSlice from "./Slice/Payment/CancelPayment";
import AvailableBookingSlice from "./Slice/Booking/AvailableBooking";
import ChangeBookingSlice from "./Slice/Booking/ChangeBooking";

const Store = configureStore({
    reducer: {
        Category:CategorySlice.reducer,
        Hotel:AllHotelSlice.reducer,
        WishlistPost:AddWishlistSlice.reducer,
        WishlistGet: GetWishlistSlice.reducer,
        WishlistDelete:DeleteWishlistSlice.reducer,
        HotelByID:GetHotelByIdSlice.reducer,
        GetAllFilter:GetAllFilterSlice.reducer,
        UserTrip:GetUserTripSlice.reducer,
        ProfileEdit:ProfileEditSlice.reducer,
        userProfile:ProfileSlice.reducer,
        auth:authSlice.reducer,
        booking:BookingHotelSlice.reducer,
        PaymentFirst:PaymentFirstSlice.reducer,
        ExecutePayment:ExecutePaymentSlice.reducer,
        CanselPayment:CancelPaymentSlice.reducer,
        AvailableBooking:AvailableBookingSlice.reducer,
        ChangeBooking:ChangeBookingSlice.reducer
    }
});

export default Store;