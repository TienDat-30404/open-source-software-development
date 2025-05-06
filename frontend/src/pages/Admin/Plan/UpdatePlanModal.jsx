import React, { useEffect, useState } from "react";
import LoadingResponseChatAI from "../../../components/Element/LoadingResponseChatAI";
import { useUpdateCategory } from "../../../hooks/useCategory";
import { useSelector } from "react-redux";
import { useUpdatePlan } from "../../../hooks/usePlan";
const UpdatePlanModal = ({ show, onClose, data }) => {
    console.log("data", data)
    const { accessToken } = useSelector(state => state.auth)
    const [content, setContent] = useState({
        name: '',
        price: '',
        description: '',
        duration: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        if (data) {
            setContent({
                name: data?.name,
                price: data?.price,
                description: data.description,
                duration: data.duration_days
            })
        }
    }, [show])



    const updatePlanMutation = useUpdatePlan({
        onSuccess: () => {
            setContent({
                name: '',
                price: '',
                description: '',
                duration: ''
            })
            setIsSubmitting(false);
            onClose();
        },
        onError: (error) => {
            console.error("Update plan thất bại:", error);
        },
    })


    const handleChange = (e) => {
        setContent({ ...content, [e.target.name]: e.target.value });
    };


    const handleUpdatePlan = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData();
        setIsSubmitting(true)
        formData.append("name", content.name);
        formData.append("price", content.price);
        formData.append("description", content.description);
        formData.append("duration_days", content.duration);

        updatePlanMutation.mutate({ id: data?.id, data: formData, token: accessToken });

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
                <h2 className="text-xl p-2 text-center font-semibold text-black">Update Plan</h2>

                <form onSubmit={handleUpdatePlan} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={content.name}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="text"
                            name="price"
                            value={content.price}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={content.description}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-black">Duration</label>
                        <select
                            name="duration"
                            value={content.duration}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-1 text-black"
                        >
                             <option value="">Select</option>
                            <option value="1">1 tháng</option>
                            <option value="2">2 tháng </option>
                            <option value="3">3 tháng</option>
                            <option value="5">4 tháng</option>
                            <option value="5">5 tháng</option>
                            <option value="6">6 tháng</option>
                            <option value="7">7 tháng</option>
                            <option value="8">8 tháng</option>
                            <option value="9">9 tháng</option>
                            <option value="10">10 tháng</option>
                            <option value="11">11 tháng</option>
                            <option value="12">12 tháng</option>
                        </select>
                    </div>


                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePlanModal;
