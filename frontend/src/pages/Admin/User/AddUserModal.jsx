import React, { useState } from "react";
import LoadingResponseChatAI from "../../../components/Element/LoadingResponseChatAI";
import { useSelector } from "react-redux";
import { useCreatePlan } from "../../../hooks/usePlan";
import { useCreateUser } from "../../../hooks/useUser";
const AddUserModal = ({ show, onClose }) => {
    const { accessToken } = useSelector(state => state.auth)
    const [content, setContent] = useState({
        userName: '',
        email: '',
        password: '',
        fullName: '',
        gender: '',
        dateOfBirth: '',
        role : '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const createUserMutation = useCreateUser({
        onSuccess: () => {
            setContent({
                userName: '',
                email: '',
                password: '',
                fullName: '',
                gender: '',
                dateOfBirth: '',
                role : ''
            })
            onClose();
        },
        onError: (error) => {
            console.error("Tạo user thất bại:", error);
        }
    });




    const handleCreateUser = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData()
        formData.append('username', content.userName)
        formData.append('email', content.email)
        formData.append('password', content.password)
        formData.append('full_name', content.fullName)
        formData.append('gender', content.gender)
        formData.append('date_of_birth', content.dateOfBirth)
        formData.append('full_name', content.fullName)
        formData.append('role_id', content.role)


        createUserMutation.mutate({ data: formData, token: accessToken });
    };

    const handleChange = (e) => {
        setContent({ ...content, [e.target.name]: e.target.value });
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
                <h2 className="text-xl p-2 text-center font-semibold text-black">Add New Plan</h2>

                <form onSubmit={handleCreateUser} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">UserName</label>
                        <input
                            type="text"
                            name="userName"
                            value={content.userName}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={content.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={content.password}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fullname</label>
                        <input
                            type="text"
                            name="fullName"
                            value={content.fullName}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-black">Gender</label>
                        <select
                            name="gender"
                            value={content.gender}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-1 text-black"
                        >
                            <option value="">Select</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ </option>
                            <option value="Khác">Khác</option>

                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={content.dateOfBirth}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
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

export default AddUserModal;
