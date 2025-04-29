import React, { useState } from "react";
import { useCreateArtist } from "../../../hooks/useArtist";
import LoadingResponseChatAI from "../../../components/Element/LoadingResponseChatAI";
import { useCreateCategory } from "../../../hooks/useCategory";
import { useSelector } from "react-redux";
const AddCategoryModal = ({ show, onClose }) => {
    const {accessToken} = useSelector(state => state.auth)
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const createCategoryMutation = useCreateCategory({
        onSuccess: () => {
            setName("")
            onClose();
        },
        onError: (error) => {
            console.error("Tạo category thất bại:", error);
        },
    });




    const handleAddCategory = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        createCategoryMutation.mutate({
            data: { name: name },  // Truyền dữ liệu cần thiết vào object 'data'
            token: accessToken     // Truyền token xác thực vào 'token'
        });
    };

    if (!show) return null;
    return (
        <div className={`$${show ? 'flex' : 'hidden'} fixed inset-0   bg-black bg-opacity-50 flex items-center justify-center z-50`}>
            <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
                {isSubmitting && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-70 rounded-lg">
                        <LoadingResponseChatAI />
                    </div>
                )}
                <div className="flex justify-end items-center">
                    <button
                        onClick={onClose}
                        className="text-gray-500  hover:text-red-500 text-2xl font-bold"
                    >
                        &times;
                    </button>
                </div>
                <h2 className="text-xl p-2 text-center font-semibold text-black">Add New Category</h2>

                <form onSubmit={handleAddCategory} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Add Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategoryModal;
