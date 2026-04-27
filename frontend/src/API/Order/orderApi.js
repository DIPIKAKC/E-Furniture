import { mainApi } from "../../App/mainApi";

//TagSystem=> for cache management as when using rtk query data is not re-fetched after updating something. it gets from cache memory
export const orderApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        
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
        
        updateCartItem: builder.mutation({
            query: ({ productId, quantity }) => ({
                url: 'cart/update',
                method: 'PATCH',
                body: { productId, quantity }
            }),
            invalidatesTags: ['Cart']
        }),
        
        removeCartItem: builder.mutation({
            query: (productId) => ({
                url: `cart/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart']
        }),
        
        getBillingDetail: builder.query({
            query: (query) => ({
                url: '/order/checkout',
                method: 'GET',
                params: query //for search
            }),
            providesTags: ['Checkout']
        }),
        
        checkoutCart: builder.mutation({
            query: (data) => ({ //data=>checkout object
                url: '/order/checkout',
                method: 'POST',
                body: data.body
            }),
            invalidatesTags: ['Checkout']
        }),



    })
})

export const { useAddToCartMutation, useGetCartQuery, useUpdateCartItemMutation, useRemoveCartItemMutation, useGetBillingDetailQuery, useCheckoutCartMutation } = orderApi;