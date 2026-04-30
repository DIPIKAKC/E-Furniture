import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useAddProductMutation, useGetAllCategoriesQuery } from "../../../API/Product/productApi";


export default function AddProduct({ onClose }) {
    const [addProduct, { isLoading }] = useAddProductMutation();
    const { data: categoryData } = useGetAllCategoriesQuery();

    const categories = categoryData?.categories || [];
    console.log("categories", categoryData)

    const schema = Yup.object({
        productName: Yup.string().required("Required"),
        price: Yup.number().required("Required"),
        description: Yup.string().required("Required"),
        category: Yup.string().required("Required"),
    });

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white w-[600px] rounded-xl shadow-lg p-6">

                <h2 className="text-xl font-semibold mb-4">Add Product</h2>

                <Formik
                    initialValues={{
                        productName: "",
                        price: "",
                        description: "",
                        category: "",
                        tags: "",
                        sizes: "",
                        colors: "",
                        images: [],
                        preview: [],
                    }}
                    onSubmit={async (values) => {
                        try {
                            const formData = new FormData();

                            formData.append("productName", values.productName);
                            formData.append("price", values.price);
                            formData.append("description", values.description);
                            formData.append("category", values.category);

                            // comma
                            formData.append("tags", JSON.stringify(values.tags.split(",")));
                            formData.append("sizes", JSON.stringify(values.sizes.split(",")));
                            formData.append("colors", JSON.stringify(values.colors.split(",")));

                            // multiple images
                            values.images.forEach((file) => {
                                formData.append("images", file);
                            });

                            await addProduct(formData).unwrap();

                            toast.success("Product added");
                            onClose();

                        } catch (err) {
                            console.log("FULL ERROR:", err);
                            console.log("BACKEND RESPONSE:", err?.data);
                            toast.error(err?.data?.message || "Error");
                        }
                    }}
                    validationSchema={schema}
                >
                    {({
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        values,
                        errors,
                        touched,
                    }) => (
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">

                            {/* NAME */}
                            <div>
                                <label>Product Name</label>
                                <input
                                    name="productName"
                                    value={values.productName}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>

                            {/* PRICE */}
                            <div>
                                <label>Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>

                            {/* CATEGORY */}
                            <div className="flex flex-col">
                                <label>Category</label>
                                <select
                                    name="category"
                                    value={values.category}
                                    onChange={handleChange}
                                    className="w-fit border px-3 py-2 rounded"
                                >
                                    <option className="text-sm" value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* TAGS */}
                            <div>
                                <label>Tags (comma separated)</label>
                                <input
                                    name="tags"
                                    value={values.tags}
                                    onChange={handleChange}
                                    placeholder="modern, wood, luxury"
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>

                            {/* SIZES */}
                            <div>
                                <label>Sizes (comma separated)</label>
                                <input
                                    name="sizes"
                                    value={values.sizes}
                                    onChange={handleChange}
                                    placeholder="S, M, L"
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>

                            {/* COLORS */}
                            <div>
                                <label>Colors (comma separated)</label>
                                <input
                                    name="colors"
                                    value={values.colors}
                                    onChange={handleChange}
                                    placeholder="white, black"
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>

                            {/* IMAGES */}
                            <div>
                                <label>Images</label>
                                <input
                                    type="file"
                                    multiple
                                    className="w-full border px-3 py-2 rounded"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files);

                                        const updatedImages = [...values.images, ...files];
                                        const updatedPreview = [
                                            ...values.preview,
                                            ...files.map((f) => URL.createObjectURL(f)),
                                        ];

                                        setFieldValue("images", updatedImages);
                                        setFieldValue("preview", updatedPreview);
                                    }}
                                />

                                {/* PREVIEW */}
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {values.preview.map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* BUTTONS */}
                            <div className="col-span-2 flex justify-end gap-3 mt-6 pr-2" >
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
                                    {isLoading ? "Adding..." : "Add Product"}
                                </button>
                            </div>

                        </form>
                    )}
                </Formik>

            </div>
        </div>
    );
}