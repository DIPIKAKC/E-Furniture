import { useDispatch } from "react-redux";
import { useDeleteProductMutation } from "../../../API/Product/productApi";
import toast from "react-hot-toast";



export default function DeleteProduct({ product, onClose }) {

    const [deleteProduct, { isLoading }] = useDeleteProductMutation();

    const handleDelete = async () => {
        try {
            await deleteProduct(product._id).unwrap();
            onClose();
            toast.success('Product deleted successfully');
        } catch (error) {
            toast.error(error?.data?.data || error?.data?.message || "Deletion failed");
        }
    }
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">

                <h2 className="text-lg font-semibold mb-4">
                    Delete Product
                </h2>

                <p className="text-sm text-gray-600 mb-6">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">
                        {product?.productName}
                    </span>?
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>

            </div>
        </div>
    );
}