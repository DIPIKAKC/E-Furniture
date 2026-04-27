import { mainApi } from "../../App/mainApi";

const searchApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({


    search: builder.query({
      query: (q) => ({
        url: `/search`,
        method: 'GET',
        params: {q}
      }),
      providesTags: ['Product']
    }),


  })
});

export const { useSearchQuery } = searchApi;