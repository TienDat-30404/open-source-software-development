import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useDeleteAllSongHistoryMusic, useDeleteSongHistoryMusic, useGetHistoryMusicListening } from "../../../hooks/useMusicListeningHistory";
export default function HistoryMusic() {
    const navigate = useNavigate()
    const { accessToken } = useSelector(state => state.auth)
    const { data: historyMusics } = useGetHistoryMusicListening("", accessToken)
    const deleteHistoryMusicMutation = useDeleteSongHistoryMusic(accessToken)
    const deleteAllHistoryMusicMutation = useDeleteAllSongHistoryMusic()

    const handleDeleteHistoryMusic = async (id) => {
        deleteHistoryMusicMutation.mutate(id)
    }

    const handleDeleteAllHistoryMusic = async() => {
        deleteAllHistoryMusicMutation.mutate(accessToken)
    }
    return (
        <div className="bg-gray-100  py-8">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Bài hát yêu thích</h2>
                <button
                    onClick={() => handleDeleteAllHistoryMusic()}
                    className="bg-red-500 hover:bg-red-700 mb-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Xóa tất cả
                </button>
                {historyMusics?.data?.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {historyMusics?.data?.map(item => (
                            <li key={item.id} className="bg-white rounded-md shadow-md overflow-hidden">
                                <div
                                    className="cursor-pointer"
                                    onClick={() => navigate(`/song/${item?.song?.id}`)}
                                >
                                    <div className="relative">
                                        <img
                                            src={item.song.image}
                                            alt={item.song.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25"></div>
                                    </div>
                                    <div className="px-4 pt-4">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.song.title}</h3>
                                        <p className="text-gray-600 text-sm">
                                            Nghệ sĩ: {item.song.artists.map(artist => artist.name).join(', ')}
                                        </p>
                                        <p className="text-gray-600 text-sm">Thể loại: {item.song.genre.name}</p>

                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-end p-4">
                                    <button
                                        onClick={() => handleDeleteHistoryMusic(item?.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Xóa
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">Chưa có bài hát yêu thích nào.</p>
                )}
            </div>
        </div>
    );
}