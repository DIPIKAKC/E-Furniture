import { mainApi } from "../../App/mainApi";

//TagSystem=> for cache management as when using rtk query data is not re-fetched after updating something. it gets from cache memory
export const postsApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        getBillingDetail: builder.query({
            query: (query) => ({
                url: '/checkout',
                method: 'GET',
                params: query //for search
            }),
            providesTags: ['Checkout'] 
        }),
        
        getBillingDetail: builder.mutation({
            query: (data) => ({ //data=>checkout object
                url: '/checkout',
                method: 'POST',
                body: data.body
            }),
            invalidatesTags: ['Checkout'] 
        }),

    })
})

export const { useGetPostsQuery, useGetSinglePostQuery, useGetMyPostsQuery, useCreatePostMutation, useUpdatePostMutation, useRemovePostMutation, useToggleLikePostMutation } = postsApi;