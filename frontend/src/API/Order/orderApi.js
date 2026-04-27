import { mainApi } from "../../App/mainApi";

//TagSystem=> for cache management as when using rtk query data is not re-fetched after updating something. it gets from cache memory
export const orderApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        getBillingDetail: builder.query({
            query: (query) => ({
                url: '/checkout',
                method: 'GET',
                params: query //for search
            }),
            providesTags: ['Checkout']
        }),

        addToCart: builder.mutation({
            query: ({ productId, quantity }) => ({
                url: 'cart/add',
                method: 'POST',
                body: { productId, quantity }
            }),
            invalidatesTags: ['Cart']
        }),

        getCart: builder.query({
            query: () => ({
                url: 'cart',
                method: 'GET',
            }),
            providesTags: ['Cart']
        }),

        removeCartItem: builder.mutation({
            query: (productId) => ({
                url: `cart/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart']
        }),


        checkoutCart: builder.mutation({
            query: (data) => ({ //data=>checkout object
                url: '/checkout',
                method: 'POST',
                body: data.body
            }),
            invalidatesTags: ['Checkout']
        }),



    })
})

export const { useGetBillingDetailQuery, useAddToCartMutation, useGetCartQuery, useRemoveCartItemMutation, useCheckoutCartMutation } = orderApi;