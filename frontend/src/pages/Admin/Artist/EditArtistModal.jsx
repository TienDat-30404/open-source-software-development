import React, { useEffect, useState } from "react";
import LoadingResponseChatAI from "../../../components/Element/LoadingResponseChatAI";
import { useUpdateArtist } from "../../../hooks/useArtist";
import { useSelector } from "react-redux";
const EditArtistModal = ({ show, onClose, data }) => {
    const {accessToken} = useSelector(state => state.auth)
    const [form, setForm] = useState({
        name: "",
        country: "",
        date_of_birth: "",
        bio: "",
    });
    const [image, setImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (data) {
            setForm({
                name: data?.name || "",
                country: data?.country || "",
                date_of_birth: data?.date_of_birth || "",
                bio: data?.bio || "",
            });
            setImage(data?.image || null);
        }
    }, [show])

    const updateArtistMutation = useUpdateArtist({
        onSuccess: () => {
            setForm({ name: "", country: "", date_of_birth: "", bio: "" });
            setIsSubmitting(false);
            setImage(null);
            onClose();
        },
        onError: (error) => {
            console.error("update artist thất bại:", error);
        },
    })



    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setForm({ ...form });
        }
        setFileInputKey(Date.now()); // Reset the file input key to force re-render
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    const handleUpdateArtist = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        setIsSubmitting(true)
        formData.append("name", form.name);
        formData.append("country", form.country);
        formData.append("date_of_birth", form.date_of_birth);
        formData.append("bio", form.bio);

        if (image instanceof File) {
            formData.append("image", image);
        }
        updateArtistMutation.mutate({
            id: data?.id,
            data: formData,
            token : accessToken
        });

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
                <h2 className="text-xl p-2 text-center font-semibold text-black">Update Artist</h2>

                <form onSubmit={handleUpdateArtist} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChangeFile}
                            className="mt-1 w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="date_of_birth"
                            value={form.date_of_birth}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            rows="3"
                            required
                            className="mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Update Artist
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditArtistModal;
