import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./Slice/Category";
import AllHotelSlice from "./Slice/Hotel";
import AddWishlistSlice from "./Slice/Wishlist/AddWishlist";
import GetWishlistSlice from "./Slice/Wishlist/GetWishlist";
import DeleteWishlistSlice from "./Slice/Wishlist/DeleteWishlist";
import FilterSlice from "./Slice/Filter/FilterPrice";
import FilterAddressSlice from "./Slice/Filter/FilterByAddress";
import GetUserTripSlice from "./Slice/trip/Trip";

const Store = configureStore({
    reducer: {
        Category: CategorySlice.reducer,
        Hotel: AllHotelSlice.reducer,
        WishlistPost: AddWishlistSlice.reducer,
        WishlistGet: GetWishlistSlice.reducer,
        WishlistDelete: DeleteWishlistSlice.reducer,
        FilterByPrice: FilterSlice,
        FilterAddress: FilterAddressSlice.reducer,
        UserTrip: GetUserTripSlice.reducer
    }
});

export default Store;
