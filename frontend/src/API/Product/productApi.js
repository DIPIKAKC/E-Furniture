import { mainApi } from "../../App/mainApi";

//TagSystem=> for cache management as when using rtk query data is not re-fetched after updating something. it gets from cache memory
export const productApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        addProduct: builder.mutation({
            query: (formdata) => ({
                url: 'add-product',
                method: 'POST',
                body: formdata
            }),
            invalidatesTags: ['Product']
        }),

        getSingleProduct: builder.query({
            query: (id) => ({
                url: `products/${id}`,
                method: 'GET',
            }),
            providesTags: ['Product'] //It obeys 'invalidatetags' of the hook where data is expired. the hook provides task to re-fetch the data as it was expired.
        }),

        getAllProducts: builder.query({
            query: () => ({
                url: 'products',
                method: 'GET',
            }),
            invalidatesTags: ['Product']
        }),

        getTopProducts: builder.query({
            query: () => ({
                url: 'products/top',
                method: 'GET',
            }),
            providesTags: ['Product']
        }),

        getRecentProducts: builder.query({
            query: () => ({
                url: 'products/recent',
                method: 'GET',
            }),
            providesTags: ['Product']
        }),

        getNewArrival: builder.query({
            query: () => ({
                url: 'products/newarrival',
                method: 'GET',
            }),
            providesTags: ['Product']
        }),
    }),


})

export const { useAddProductMutation, useGetAllProductsQuery, useGetTopProductsQuery, useGetRecentProductsQuery, useGetNewArrivalQuery, useGetSingleProductQuery  } = productApi;