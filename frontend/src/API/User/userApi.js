import { mainApi } from "../../App/mainApi";

//TagSystem=> for cache management as when using rtk query data is not re-fetched after updating something. it gets from cache memory
export const userApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        getUser: builder.query({
            query: () => ({
                url: '/user',
                method: 'GET',
            }),
            providesTags: ['User']
        }),

        updateUser: builder.mutation({
            query: (data) => ({
                url: '/profile',
                method: 'PATCH',
                body: data.body
            }),
            invalidatesTags: ['User']
        }),

    })
})

export const { useGetUserQuery, useUpdateUserMutation } = userApi;