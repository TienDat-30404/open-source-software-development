import React, { useState } from "react";
import LoadingResponseChatAI from "../../../components/Element/LoadingResponseChatAI";
import Select from "react-select";
import { useGetAllSong } from "../../../hooks/useSong";

import { useCreateAlbum } from "../../../hooks/useAlbum";

const AddAlbumModal = ({ show, onClose }) => {
    const [form, setForm] = useState({
        name: "",
        releaseDate : "",
        songIds : []
    });
    const [image, setImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    
    const { data: songs, isLoading, isError, error } = useGetAllSong("")

    const createAlbumMutation = useCreateAlbum({
        onSuccess: () => {
            setForm({
                name: "",
                releaseDate : "",
                image : "",
                songIds : []
            });
            setImage(null);
            onClose();
        },
        onError: (error) => {
            console.error("Tạo album thất bại:", error);
        },
    });

    const options = songs?.results.map((song) => ({
        value: song.id, label: song.title
    }))

    const [isSubmitting, setIsSubmitting] = useState(false);


    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleChooseSong = (selected) => {
        setSelectedOptions(selected);
    };

  

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        const { name } = e.target;
        if (file) {
            if (name === 'image') {
                setImage(file);
                setForm((prev) => ({ ...prev, image: file }));
            }
        }
        setFileInputKey(Date.now()); // Reset the file input key to force re-render
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    const handleCreateAlbum = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData();
        formData.append("title", form.name);
        let songsOnAlbum;
        if (selectedOptions?.length > 0) {
            songsOnAlbum = selectedOptions?.map(song => song?.value) || [];
        } 
        formData.append("release_date", form?.releaseDate);
        formData.append("release_date", "2001-05-25");
        formData.append("image", image);
        formData.append("song_ids", JSON.stringify(songsOnAlbum));

        createAlbumMutation.mutate(formData);

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
                <h2 className="text-xl p-2 text-center font-semibold text-black">Create New Album</h2>

                <form onSubmit={handleCreateAlbum} className="space-y-4">
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
                        <label className="block text-sm font-medium text-gray-700">Song</label>
                        <Select
                            isMulti
                            value={selectedOptions}
                            options={options}
                            onChange={handleChooseSong}
                            styles={{
                                menu: (provided) => ({
                                    ...provided,
                                    overflowY: 'auto',
                                    borderColor: 'red',
                                    color: 'black'
                                })
                            }}
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
                        <label className="block text-sm font-medium text-gray-700">Release Date</label>
                        <input
                            type="date"
                            name="releaseDate"
                            value={form.releaseDate}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>


        </div>
    );
};

export default AddAlbumModal;
