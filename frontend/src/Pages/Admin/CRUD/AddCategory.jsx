import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useAddCategoryMutation } from "../../../API/Product/productApi";


export default function AddCategory({ onClose }) {
    const [addCategory, { isLoading }] = useAddCategoryMutation();

    const schema = Yup.object({
        name: Yup.string().required("Required"),
    });

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white w-[600px] rounded-xl shadow-lg p-6">

                <h2 className="text-xl font-semibold mb-4">Add Product</h2>

                <Formik
                    initialValues={{
                        name: "",
                    }}
                    onSubmit={async (values) => {
                        try {
                            const res = await addCategory(values).unwrap();
                            toast.success("Category added successfully");
                            console.log("added category:",res)
                            onClose();

                        } catch (err) {
                            toast.error(err?.data?.message || "Error");
                        }
                    }}
                    validationSchema={schema}
                >
                    {({
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        values
                    }) => (
                        <form onSubmit={handleSubmit}>

                            <div>
                                <label>Category Name</label>
                                <input
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>


                            {/* BUTTONS */}
                            <div className="flex justify-end gap-3 mt-6 pr-2" >
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-6 py-2 bg-black text-white rounded"
                                >
                                    {isLoading ? "Adding..." : "Add Category"}
                                </button>
                            </div>

                        </form>
                    )}
                </Formik>

            </div>
        </div>
    );
}