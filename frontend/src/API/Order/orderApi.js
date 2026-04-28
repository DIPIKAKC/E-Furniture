import { mainApi } from "../../App/mainApi";

//TagSystem=> for cache management as when using rtk query data is not re-fetched after updating something. it gets from cache memory
export const orderApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        
        addToCart: builder.mutation({
            query: (data) => ({
                url: 'cart/add',
                method: 'POST',
                body: data
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
            providesTags: ['Cart']
        }),
        
        checkoutCart: builder.mutation({
            query: (data) => ({ //data=>checkout object
                url: '/order/checkout',
                method: 'POST',
                body: data.body
            }),
            invalidatesTags: ['Cart']
        }),
        
        getMyOrders: builder.query({
            query: () => ({
                url: '/order',
                method: 'GET',
            }),
            providesTags: ['Cart']
        }),
        

    })
})

export const { useAddToCartMutation, useGetCartQuery, useUpdateCartItemMutation, useRemoveCartItemMutation, useGetBillingDetailQuery, useCheckoutCartMutation, useGetMyOrdersQuery } = orderApi;