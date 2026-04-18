import { mainApi } from "../../App/mainApi";

//TagSystem=> for cache management as when using rtk query data is not re-fetched after updating something. it gets from cache memory
export const postsApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        getCheckoutDetail: builder.query({
            query: (query) => ({
                url: '/che',
                method: 'GET',
                params: query //for search
            }),
            providesTags: ['Post'] 
        }),

    })
})

export const { useGetPostsQuery, useGetSinglePostQuery, useGetMyPostsQuery, useCreatePostMutation, useUpdatePostMutation, useRemovePostMutation, useToggleLikePostMutation } = postsApi;