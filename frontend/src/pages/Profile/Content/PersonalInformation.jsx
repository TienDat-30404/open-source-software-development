import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { useSelector } from 'react-redux';
import { updateProfile } from '../../../services/UserService';
import { updateProfileRedux } from '../../../redux/authSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
const PersonalInformation = () => {
  const dispatch = useDispatch()
  const { auth, accessToken, isAuthenticated } = useSelector((state) => state.auth);
  const [informations, setInformations] = useState({
    fullName: '',
    email: '',
    gender: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      setInformations({
        fullName: auth.full_name,
        email: auth.email,
        gender: auth.gender,
        dateOfBirth: auth.date_of_birth
      })
    }
  }, [])

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInformations({ ...informations, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setInformations({ ...informations, dateOfBirth: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    
      const formData = new FormData()
      formData.append('full_name', informations.fullName)
      formData.append('gender', informations.gender)
      formData.append('date_of_birth', informations.dateOfBirth)

      const response = await updateProfile(formData, accessToken);

      // Nếu API trả về dữ liệu mới, cập nhật Redux store
      if (response && response.data) {
        dispatch(updateProfileRedux(response.data));
        toast.error("Cập nhật thành công")
      } else {
        toast.success("Cập nhật thất bại")
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật hồ sơ:', error);
      toast.error("Cập nhật thất bại", error)
    }

    setLoading(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-black">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={informations.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-1 text-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">Username</label>
            <input
              type="userName"
              name="userName"
              value={auth.username}
              onChange={handleChange}
              required
              disabled
              className="w-full border border-gray-300 rounded px-3 py-1 bg-gray-100 cursor-not-allowed text-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">Email</label>
            <input
              type="email"
              name="email"
              value={informations.email}
              onChange={handleChange}
              required
              disabled
              className="w-full border border-gray-300 rounded px-3 py-1 bg-gray-100 cursor-not-allowed text-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">Gender</label>
            <select
              name="gender"
              value={informations.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-1 text-black"
            >
              <option value="">Select</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={informations.dateOfBirth}
              onChange={handleDateChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-1 text-black"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInformation;
