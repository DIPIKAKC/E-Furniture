import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'
// import { userSlice } from '../API/Slice/userSlice';

export const base = 'https://e-furniture-e9vv.onrender.com';
console.log(base);

export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${base}/api`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.userSlice?.token;

            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["Dashboard"],
    endpoints: () => ({})
})
