import React, { useEffect, useState } from "react";
import LoadingResponseChatAI from "../../../components/Element/LoadingResponseChatAI";
import { useSelector } from "react-redux";
import { useUpdatePlan } from "../../../hooks/usePlan";
import { useUpdateUser } from "../../../hooks/useUser";
import { useGetAllRole } from "../../../hooks/useRole";
const UpdateUserModal = ({ show, onClose, data }) => {
    console.log("data", data)
    
    const { accessToken } = useSelector(state => state.auth)
    const { data: roles, isLoading, isError, error } = useGetAllRole("", accessToken)
    const [content, setContent] = useState({
        userName: '',
        email: '',
        fullName: '',
        gender: '',
        dateOfBirth: '',
        role: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        if (data) {
            setContent({
                userName: data?.username,
                email: data?.email,
                fullName: data.full_name,
                gender: data.gender,
                dateOfBirth: data.date_of_birth,
                role: data.role_id,

            })
        }
    }, [show])



    const updateUserMutation = useUpdateUser({
        onSuccess: () => {
            setContent({
                userName: '',
                email: '',
                fullName: '',
                gender: '',
                dateOfBirth: '',
                role : ''
            })
            setIsSubmitting(false);
            onClose();
        },
        onError: (error) => {
            console.error("Update user thất bại:", error);
        },
    })


    const handleChange = (e) => {
        setContent({ ...content, [e.target.name]: e.target.value });
    };


    const handleUpdateUser = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData();
        setIsSubmitting(true)
        formData.append("username", content.userName);
        formData.append("email", content.email);
        formData.append("full_name", content.fullName);
        formData.append("gender", content.gender);
        formData.append("date_of_birth", content.dateOfBirth);
        formData.append("role", content.role);

        updateUserMutation.mutate({ id: data?.id, data: formData, token: accessToken });

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
                <h2 className="text-xl p-2 text-center font-semibold text-black">Update User</h2>

                <form onSubmit={handleUpdateUser} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
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
                        <label className="block text-sm font-medium text-gray-700">FullName</label>
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
                        <label className="block text-sm font-medium text-gray-700">Date Of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={content.dateOfBirth}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            name="role"
                            value={content.role}
                            className="mt-1 w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                        >
                            <option value="">Select a role</option>
                            {roles?.data?.map((role) => (
                                <option value={role?.id}>{role?.name}</option>
                            ))}
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

export default UpdateUserModal;
