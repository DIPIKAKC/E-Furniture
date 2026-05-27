import { mainApi } from "../../App/mainApi";

//TagSystem=> for cache management as when using rtk query data is not re-fetched after updating something. it gets from cache memory
export const reviewApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        addReview: builder.mutation({
            query: ({ productId, formData }) => ({
                url: `review/${productId}`,
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Product']
        }),

        getReviews: builder.query({
            query: ({productId}) => ({
                url: `review/${productId}`,
                method: 'GET',
            }),
            providesTags: ['Product']
        }),


    }),


})

export const { useAddReviewMutation, useGetReviewsQuery } = reviewApi;