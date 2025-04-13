import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./Slice/Category";
import AllHotelSlice from "./Slice/Hotel";
import { addwishlistPost } from "./Slice/Wishlist/AddWishlist";

const Store = configureStore({
    reducer: {
        Category:CategorySlice.reducer,
        Hotel:AllHotelSlice.reducer,
        WishlistPost:addwishlistPost,
    }
});

export default Store;
