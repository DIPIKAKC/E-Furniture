import React from "react";
import { Formik } from "formik";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useGetUserQuery, useUpdateUserMutation } from "../../API/User/userApi";

export default function Profile() {
    const { user } = useSelector((state) => state.userSlice);

    const { isLoading, data, error } = useGetUserQuery();
    const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

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
        <div className=" flex flex-col gap-5 p-7 items-center justify-center bg-amber-100">

            <h2 className="text-xl font-semibold mb-4">
                Edit Profile
            </h2>
            {/* CARD */}
            <div className="w-[550px] bg-white rounded-lg shadow-lg py-6 px-10">


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
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:border-black"
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
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:border-black"
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
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:border-black"
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
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:border-black"
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
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:border-black"
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
                                    className=' cursor-pointer px-8 py-2 border border-black rounded-md hover:bg-black hover:text-white transition'
                                >
                                    {updateLoading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>

                        </form>
                    )}
                </Formik>

            </div>
        </div>
    );
}