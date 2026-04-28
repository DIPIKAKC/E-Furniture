import React from "react";
import { Formik } from "formik";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useGetUserQuery, useUpdateUserMutation } from "../../API/User/userApi";
import { useGetMyOrdersQuery } from "../../API/Order/orderApi";
import OrderCard from "../../components/global/orderCard";

export default function Profile() {
    const { user } = useSelector((state) => state.userSlice);

    const { isLoading, data, error } = useGetUserQuery();
    const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
    const { data: orderData } = useGetMyOrdersQuery();
    const orders = orderData?.data;
    console.log("orderdata", orders)


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error?.data?.message}</p>;

    const schema = Yup.object({
        firstName: Yup.string().min(2).required("Required"),
        lastName: Yup.string().min(2).required("Required"),
        companyName: Yup.string().required("Required"),
        phone: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
    });

    return (
        <div className="flex justify-evenly p-7 ">

            {/* <h2 className="text-3xl font-semibold mb-4">
                Edit Profile
            </h2> */}
            {/* CARD */}
            <div className="flex flex-col gap-5">
                <h2 className="font-bold text-2xl">Account Details</h2>
                <div className="w-[550px] bg-white shadow-lg rounded-3xl">
                    <div className="flex items-center gap-5 bg-amber-200 py-5 px-10 rounded-t-3xl">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-xl font-bold text-white border-1 border-white">
                            {data?.user?.firstName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="mt-1 text-base font-semibold text-amber-500">
                                {data?.user?.firstName} {data?.user?.lastName}
                            </p>
                            <p className="text-sm text-white">{data?.user?.email ?? "user@example.com"}</p>
                        </div>
                    </div>

                    <div className="py-6 px-10">
                        <Formik
                            initialValues={{
                                firstName: data?.user?.firstName || "",
                                lastName: data?.user?.lastName || "",
                                companyName: data?.user?.companyName || "",
                                phone: data?.user?.phone || "",
                                address: data?.user?.address || "",
                            }}
                            onSubmit={async (val) => {
                                try {
                                    const res = await updateUser({
                                        body: val
                                    }).unwrap();

                                    toast.success("Profile updated");
                                    console.log("Updated user", res)
                                } catch (err) {
                                    toast.error(err?.data?.message || "Update failed");
                                }
                            }}
                            validationSchema={schema}
                        >
                            {({ handleChange, handleSubmit, values, errors, touched }) => (
                                <form onSubmit={handleSubmit} className="space-y-4">

                                    {/* FIRST NAME */}
                                    <div>

                                        <label className="block text-sm font-medium mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:border-black"
                                        />
                                        {touched.firstName && errors.firstName && (
                                            <p className="text-red-500 text-sm">{errors.firstName}</p>
                                        )}
                                    </div>

                                    {/* LAST NAME */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:border-black"
                                        />
                                        {touched.lastName && errors.lastName && (
                                            <p className="text-red-500 text-sm">{errors.lastName}</p>
                                        )}
                                    </div>

                                    {/* COMPANY */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={values.companyName}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:border-black"
                                        />
                                    </div>

                                    {/* PHONE */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={values.phone}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:border-black"
                                        />
                                        {touched.phone && errors.phone && (
                                            <p className="text-red-500 text-sm">{errors.phone}</p>
                                        )}
                                    </div>

                                    {/* ADDRESS */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={values.address}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:border-black"
                                        />
                                        {touched.address && errors.address && (
                                            <p className="text-red-500 text-sm">{errors.address}</p>
                                        )}
                                    </div>

                                    {/* BUTTON */}
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={updateLoading}
                                            className=' cursor-pointer px-8 py-2 text-sm border border-black rounded-md hover:bg-black hover:text-white transition'
                                        >
                                            {updateLoading ? "Saving..." : "Save Changes"}
                                        </button>
                                    </div>

                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <h2 className="font-bold text-2xl">Order History</h2>
                {orders?.length > 0 ? (
                    orders.map(order => (
                        <OrderCard key={order._id} order={order} />
                    ))
                ) : (
                    <p className="text-gray-500">No orders found</p>
                )}
            </div>
        </div>
    );
}