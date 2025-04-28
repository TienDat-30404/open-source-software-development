import React, { useEffect, useState } from "react";
import LoadingResponseChatAI from "../../../components/Element/LoadingResponseChatAI";
import { useUpdateCategory } from "../../../hooks/useCategory";
import { useSelector } from "react-redux";
const EditCategoryModal = ({ show, onClose, data }) => {
    const {accessToken} = useSelector(state => state.auth)
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (data) {
            setName(data?.name || "");
        }
    }, [show])

    const updateCategoryMutation = useUpdateCategory({
        onSuccess: () => {
            setName("")
            setIsSubmitting(false);
            onClose();
        },
        onError: (error) => {
            console.error("Update category thất bại:", error);
        },
    })




    const handleUpdateCategory = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData();
        setIsSubmitting(true)
        formData.append("name", name);
       
        updateCategoryMutation.mutate({ id: data?.id, data: formData, token : accessToken });

    };

    if (!show) return null;
    return (
        <div className={`${show ? 'flex' : 'hidden'} fixed inset-0   bg-black bg-opacity-50 flex items-center justify-center z-50`}>
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
                <h2 className="text-xl p-2 text-center font-semibold text-black">Update Category</h2>

                <form onSubmit={handleUpdateCategory} className="space-y-4">
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
                            Update Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCategoryModal;
