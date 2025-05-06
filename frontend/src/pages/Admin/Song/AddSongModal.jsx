import React, { useState } from "react";
import { useCreateArtist, useGetAllArtist } from "../../../hooks/useArtist";
import LoadingResponseChatAI from "../../../components/Element/LoadingResponseChatAI";
import Select from "react-select";
import { useGetAllCatgory } from "../../../hooks/useCategory";
import { useCreateSong } from "../../../hooks/useSong";
import { createSong } from "../../../services/SongService";
import { useSelector } from "react-redux";

const AddSongModal = ({ show, onClose }) => {
    const {accessToken} = useSelector(state => state.auth)
    const [form, setForm] = useState({
        name: "",
        artist_ids: [],
        category: "",
        releaseDate: "",
    });
    const { data: artists, isLoading, isError, error } = useGetAllArtist("")
    const createSongMutation = useCreateSong({
        onSuccess: () => {
            setForm({
                name: "", artist_ids: [],
                category: "",
                releaseDate: "",
                audio: "",
                image: ""
            });
            setImage(null);
            setAudio(null)
            setVideo(null)
            onClose();
        },
        onError: (error) => {
            console.error("Tạo song thất bại:", error);
        },
        token : accessToken
    });
    const { data: categories } = useGetAllCatgory("")

    console.log("artists", artists)
    const options = artists?.results.map((artist) => ({
        value: artist.id, label: artist.name
    }))

    const [isSubmitting, setIsSubmitting] = useState(false);


    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleChooseArtist = (selected) => {
        setSelectedOptions(selected);
    };

    console.log("selectedOptions", selectedOptions)
    const [image, setImage] = useState(null);
    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);

    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        const { name } = e.target;
        if (file) {
            if (name === 'image') {
                setImage(file);
                setForm((prev) => ({ ...prev, image: file }));
            } else if (name === 'audio') {
                setAudio(file);
                setForm((prev) => ({ ...prev, audio: file }));
            }
            else if (name === 'video') {
                setVideo(file);
                setForm((prev) => ({ ...prev, video: file }));
            }
        }
        setFileInputKey(Date.now()); // Reset the file input key to force re-render
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    const handleAddSong = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData();
        formData.append("title", form.name);
        let artistIds;
        if (selectedOptions?.length > 0) {
            artistIds = selectedOptions?.map(artist => artist?.value) || [];
        } 
        console.log("artistIds", artistIds)
        formData.append("artist_ids", JSON.stringify(artistIds));
        formData.append("genre_id", form?.category);
        formData.append("release_date", form?.releaseDate);
        formData.append("image", image);
        formData.append("audio_url", audio);
        formData.append("video_url", video)
        createSongMutation.mutate(formData);

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

                <form onSubmit={handleAddSong} className="space-y-4">
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
                        <label className="block text-sm font-medium text-gray-700">Artist</label>
                        <Select
                            isMulti
                            value={selectedOptions}
                            options={options}
                            onChange={handleChooseArtist}
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
                        <label className="block text-sm font-medium text-gray-700">Audio</label>
                        <input
                            type="file"
                            name="audio"
                            accept="audio/*"
                            onChange={handleChangeFile}
                            required
                            className="mt-1 w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Video</label>
                        <input
                            type="file"
                            name="video"
                            accept="video/*"
                            onChange={handleChangeFile}
                            required
                            className="mt-1 w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>



                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            value={form.category}
                            className="mt-1 w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                        >
                            <option value="">Select a category</option>
                            {categories?.results?.map((category) => (
                                <option value={category?.id}>{category?.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Release Date</label>
                        <input
                            type="date"
                            name="releaseDate"
                            value={form.releaseDate}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>



                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Add Song
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSongModal;
