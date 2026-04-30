import { mainApi } from "../../App/mainApi";

export const adminApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        
        getDashboardStats: builder.query({
            query: () => ({
                url: 'admin/dashboard',
                method: 'GET',
            }),
            providesTags: ['Dashboard']
        }),
        

    })
})

export const { useGetDashboardStatsQuery } = adminApi;