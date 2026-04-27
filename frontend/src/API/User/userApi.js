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

    })
})

export const { useGetUserQuery } = userApi;