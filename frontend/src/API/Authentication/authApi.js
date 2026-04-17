import { mainApi } from "../../App/mainApi";

export const authApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        userLogin: builder.mutation({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body
            })
        }),

        userRegister: builder.mutation({
            query: (body) => ({
                url: "register",
                method: "POST",
                body
            }),
        }),

    })
})

export const { useUserLoginMutation, useUserRegisterMutation } = authApi;