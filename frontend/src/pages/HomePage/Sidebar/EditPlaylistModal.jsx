import React, { useState, useEffect } from 'react';
import { X, Music } from 'lucide-react';
import { updatePlaylist } from '../../../services/PlayListService';
import { handleChangeFile, handleChangeInput } from '../../../until/function';
import { useUpdatePlaylist } from '../../../hooks/usePlaylists';
import { useSelector } from 'react-redux';
function EditPlaylistModal({ show, data, close }) {
  const {accessToken} = useSelector(state => state.auth)
  const updatePlaylistMutation = useUpdatePlaylist()
  const [informations, setInformations] = useState({
    id: '',
    image: '',
    title: '',
    description: ''
  })
  const [image, setImage] = useState(null)
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  useEffect(() => {
    if (show) {
      setInformations({
        id: data?.id,
        image: data?.image,
        title: data?.title,
        description: data?.description
      })
    }
  }, [show])

  const handleUpdatePlaylist = async () => {
    const formData = new FormData()
    formData.append('title', informations?.title)
    formData.append('description', informations?.description)
    if (image) {
      formData.append('image', image)
    }
    updatePlaylistMutation.mutate({
      id: informations?.id,
      data: formData,
      token : accessToken
    })
  }

  const handleClose = () => {
    close()
    setInformations({
      id: '',
      image: '',
      title: '',
      description: ''
    })
    setFileInputKey(Date.now());

  }
  return (
    <div className={`fixed inset-0 ${show ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-50`}>
      <div className="bg-[#282828] text-white rounded-lg p-6 w-[500px] z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Sửa thông tin chi tiết</h2>
          <button onClick={() => handleClose()}>
            <X />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* {informations?.image ? (
            <img src = {informations?.image} className='w-full h-36' />
          ) : (
            <div className="bg-[#3E3E3E] rounded-lg p-4 flex items-center justify-center">
              <Music size={60} className="text-gray-400" />
            </div>
          )} */}
          <input
            key={fileInputKey}
            type="file"
            name="image"
            onChange={(e) => handleChangeFile(e, setImage)}
          />
          <div className="space-y-2">
            <input
              name="title"
              onChange={(e) => handleChangeInput(e, setInformations)}
              type="text"
              value={informations?.title}
              className="bg-[#3E3E3E] rounded-lg p-2 w-full"
            />
            <textarea
              name="description"
              onChange={(e) => handleChangeInput(e, setInformations)}
              value={informations?.description || ""}
              placeholder="Thêm phần mô tả (không bắt buộc)"
              className="bg-[#3E3E3E] rounded-lg p-2 w-full h-24"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            className="bg-[#1ED760] text-black rounded-full px-6 py-2 w-full"
            onClick={() => handleUpdatePlaylist()}
          >
            Lưu
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Bằng cách tiếp tục, bạn đồng ý cho phép Spotify truy cập vào hình ảnh bạn đã chọn để tải lên.
          Vui lòng đảm bảo bạn có quyền tải lên hình ảnh.
        </p>
      </div>
    </div>
  );
}

export default EditPlaylistModal;