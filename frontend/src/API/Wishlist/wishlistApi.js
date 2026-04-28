import { mainApi } from "../../App/mainApi";

export const wishlistApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({


        addToWishlist: builder.mutation({
            query: (productId) => ({
                url: `like/${productId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Product']
        }),

        getWishlist: builder.query({
            query: () => ({
                url: '/liked',
                method: 'GET',
            }),
            providesTags: ['Product']
        }),




    })
})

export const { useAddToWishlistMutation, useGetWishlistQuery } = wishlistApi;