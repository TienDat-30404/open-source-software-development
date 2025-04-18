import React, { useState } from "react";
import { useCreateArtist } from "../../../hooks/useArtist";
import LoadingResponseChatAI from "../../../components/Element/LoadingResponseChatAI";
const AddArtistModal = ({ show, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    country: "",
    date_of_birth: "",
    bio: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createArtistMutation = useCreateArtist({
    onSuccess: () => {
      setForm({ name: "", country: "", date_of_birth: "", bio: "" });
      setImage(null);
      onClose();
    },
    onError: (error) => {
      console.error("Tạo artist thất bại:", error);
    },
  });


  const [image, setImage] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setForm({ ...form, image: file });
    }
    setFileInputKey(Date.now()); // Reset the file input key to force re-render
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleAddArtist = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    setIsSubmitting(true)
    formData.append("name", form.name);
    formData.append("country", form.country);
    formData.append("date_of_birth", form.date_of_birth);
    formData.append("bio", form.bio);

    if (image) {
      formData.append("image", image);
    }
    createArtistMutation.mutate(formData);

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
        <h2 className="text-xl p-2 text-center font-semibold text-black">Add New Artist</h2>

        <form onSubmit={handleAddArtist} className="space-y-4">
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
              required
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
              Add Artist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArtistModal;
