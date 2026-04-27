import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./mainApi";
import { userSlice } from "../API/Slice/userSlice";
import { cartSlice } from "../API/Slice/cartSlice";


export const store = configureStore({
    reducer: {
        [mainApi.reducerPath]: mainApi.reducer,
        [userSlice.name]: userSlice.reducer,
        [cartSlice.name]: cartSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(mainApi.middleware)

})