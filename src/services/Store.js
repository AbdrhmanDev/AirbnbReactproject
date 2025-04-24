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
        userProfile:ProfileSlice.reducer,
        ProfileEdit:ProfileEditSlice.reducer
    }
});

export default Store;
