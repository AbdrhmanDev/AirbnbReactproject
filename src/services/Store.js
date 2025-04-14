import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./Slice/Category";
import AllHotelSlice from "./Slice/Hotel";
import AddWishlistSlice from "./Slice/Wishlist/AddWishlist";
import GetWishlistSlice from "./Slice/Wishlist/GetWishlist";

const Store = configureStore({
    reducer: {
        Category:CategorySlice.reducer,
        Hotel:AllHotelSlice.reducer,
        WishlistPost:AddWishlistSlice.reducer,
        WishlistGet: GetWishlistSlice.reducer,
    }
});

export default Store;
