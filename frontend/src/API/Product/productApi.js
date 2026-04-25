import { mainApi } from "../../App/mainApi";

//TagSystem=> for cache management as when using rtk query data is not re-fetched after updating something. it gets from cache memory
export const productApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        addProduct: builder.mutation({
            query: (formdata) => ({
                url: 'add-product',
                method: 'POST',
                body: formdata
            }),
            invalidatesTags: ['Product']
        }),

        getAllProducts: builder.query({
            query: () => ({
                url: 'products',
                method: 'GET',
            }),
            invalidatesTags: ['Product']
        }),
    }), 


})

export const { useAddProductMutation, useGetAllProductsQuery } = productApi;