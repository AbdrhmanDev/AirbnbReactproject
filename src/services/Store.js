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
import LoginPhoneSlice from "./Slice/login/LoginPhone";
import verifyOtpSlice from "./Slice/login/verifyOtp";
import RegisterSlice from "./Slice/login/Register";
import BookingBtIdSlice from "./Slice/Booking/GetBookingById";
import SendMessageSlice from "./Slice/Chat/ChatSend";
import conversationsSlice from "./Slice/Chat/conversationsGet";
import conversationsPersonalSlice from "./Slice/Chat/conversationsPersonal";
import ReviewsSlice from "./Slice/reviews/Addreviews";
import ReviewsGetIdSlice from "./Slice/reviews/reviewsGetId";
import DeleteReviewsSlice from "./Slice/reviews/Deletereviews";
import updateReviewsSlice from "./Slice/reviews/UpdateReview";
import LoginWithEmailSlice, { LoginWithEmailThunk } from "./Slice/login/LoginWithEmail";

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
        ChangeBooking:ChangeBookingSlice.reducer,
        LoginPhone:LoginPhoneSlice.reducer,
        verifyOtp:verifyOtpSlice.reducer,
        register:RegisterSlice.reducer,
        BookingByID:BookingBtIdSlice.reducer,
        sendMessage:SendMessageSlice.reducer,
        conversation:conversationsSlice.reducer,
        conversationsPersonal:conversationsPersonalSlice.reducer,
        Reviews:ReviewsSlice.reducer,
        ReviewsGetId:ReviewsGetIdSlice.reducer,
        DeleteReviews:DeleteReviewsSlice.reducer,
        updateReview:updateReviewsSlice.reducer,
        LoginWithEmail:LoginWithEmailSlice.reducer
    }
});

export default Store;