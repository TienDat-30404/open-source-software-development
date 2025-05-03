import React, { useEffect, useState } from "react";
import LoadingResponseChatAI from "../../../components/Element/LoadingResponseChatAI";
import { useGetAllArtist, useUpdateArtist } from "../../../hooks/useArtist";
import Select from "react-select";
import {useUpdateSong } from "../../../hooks/useSong";
import { useSelector } from "react-redux";
import { useGetAllCatgory } from "../../../hooks/useCategory";

const UpdateSongModal = ({ show, onClose, data }) => {
    const { accessToken } = useSelector(state => state.auth)
    const [form, setForm] = useState({
        name: "",
        genre: "",
        releaseDate: "",
        artistIds: []
    });
    const [image, setImage] = useState(null);
    const [audioFile, setAudioFile] = useState(null)

    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: categories } = useGetAllCatgory("")
    const { data: artists, isLoading, isError, error } = useGetAllArtist("")

    const options = artists?.results.map((artist) => ({
        value: artist.id, label: artist.name
    }))

    useEffect(() => {
        if (data) {
            const artistsSelect = data?.artists?.map((artist) => ({
                value: artist.id, label: artist.name
            }))
            setForm({
                name: data?.title || "",
                genre: data?.genre?.id || "",
                releaseDate: data?.release_date,
                artistIds: artistsSelect
            });
            setImage(data?.image || null);
            setAudioFile(data?.audio_url || null)
        }
    }, [show])

    const handleChooseArtist = (selected) => {
        setForm((prevForm) => ({
            ...prevForm,
            artistIds: selected
        }));
    };

    const updateSongMutation = useUpdateSong({
        onSuccess: () => {
            setForm({
                name: "",
                genre: "",
                releaseDate: "",
                artistIds: []
            });
            setIsSubmitting(false);
            setImage(null);
            setAudioFile(null)
            onClose();
        },
        onError: (error) => {
            console.error("Update song thất bại:", error);
        },
    })



    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        const name = e.target.name;
    
        if (name === "image" && file) {
            setImage(file);
        } else if (name === "audio" && file) {
            setAudioFile(file);
        }
    
        setFileInputKey(Date.now());
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    const handleUpdateSong = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        setIsSubmitting(true)
        let artistOnSong;
        if (form.artistIds?.length > 0) {
            artistOnSong = form?.artistIds?.map(artist => artist?.value) || [];
        }
        formData.append("title", form.name);
        formData.append("release_date", form.releaseDate);
        formData.append("genre_id", form.genre);

        formData.append("artist_ids", JSON.stringify(artistOnSong));

        if (image instanceof File) {
            formData.append("image", image);
        }
        if (audioFile instanceof File) {
            formData.append("audio_url", audioFile);
        }

        updateSongMutation.mutate({
            id: data?.id,
            data: formData,
            token: accessToken
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
                <h2 className="text-xl p-2 text-center font-semibold text-black">Update Song</h2>

                <form onSubmit={handleUpdateSong} className="space-y-4">
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
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="genre"
                            value={form.genre}
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
                        <label className="block text-sm font-medium text-gray-700">Audio</label>
                        <input
                            type="file"
                            name="audio"
                            accept="audio/*"
                            onChange={handleChangeFile}
                            className="mt-1 w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="">
                        <label className="block text-sm font-medium text-gray-700">Artist</label>
                        <Select
                            isMulti
                            value={form.artistIds}
                            options={options}
                            onChange={handleChooseArtist}
                            styles={{
                                menu: (provided) => ({
                                    ...provided,
                                    overflowY: 'auto',
                                    maxHeight: 200,
                                    borderColor: 'red',
                                    color: 'black'
                                })
                            }}
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
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateSongModal;
