import React, { useState } from 'react';
import { MoreHorizontal, Users } from 'lucide-react';
import Pagination from '../../../components/Pagination/Pagination';
import { visiblePagination } from '../../../until/function';
import { useDeleteCategory, useGetAllCatgory } from '../../../hooks/useCategory';

import { useSelector } from 'react-redux';
import { useDeletePlan, useGetAllPlan } from '../../../hooks/usePlan';
import { useDeleteUser, useGetAllUser } from '../../../hooks/useUser';
import AddUserModal from './AddUserModal';
import UpdateUserModal from './UpdateUserModal';
function User() {
    const { accessToken } = useSelector(state => state.auth)
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(5)
    let query = `/?page=${page}&size=${size}`
    const { data: users, isLoading, isError, error } = useGetAllUser(query, accessToken)
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [dataUser, setDataUser] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)
    const deleteUserMutation = useDeleteUser(accessToken)

    const handleSelectedUser = (user) => {
        if (selectedUser === null) {
            setSelectedUser(user)
        }
        else {
            setSelectedUser(null)
        }
    }
    const handleSelectedUpdateUser = (user) => {
        setDataUser(user)
        setShowModalUpdateUser(true)
    }

    const handleDeleteUser = (id) => {
        deleteUserMutation.mutate(id)
    }

    const handlePagination = (newPage) => {
        if (newPage >= 1 && (users?.next || users?.previous)) {
            setPage(newPage)
        }
    }
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="bg-white rounded-md shadow-md overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <button
                        onClick={() => setShowModalCreateUser(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add User
                    </button>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Show rows</span>
                        <select
                            className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={size}
                            onChange={(e) => {
                                setSize(e.target.value)
                                setPage(1)
                            }}
                        >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        {/* <span>Viewing 1 - {data.length} of {data.length}</span> */}
                        <button className="outline-none focus:outline-none">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"></path></svg>
                        </button>
                    </div>
                </div>

                {/* Bảng dữ liệu */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Id
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Username
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fullname
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Gender
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    DateOfBirth
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created At
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Updated At
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users && users?.data?.length > 0 && users?.data?.map((user, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="ml-2 text-sm font-medium text-gray-900">
                                            {(user?.id).slice(0, 10)}...
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                                        {user?.username}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                                        {user?.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                                        {user?.full_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                                        {user?.gender}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                                        {user?.date_of_birth}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(user?.created_at).toLocaleString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(user?.updated_at).toLocaleString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                                        <button className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                                            onClick={() => handleSelectedUser(user?.id)}
                                        >
                                            <MoreHorizontal />
                                        </button>
                                        {selectedUser === user?.id && (
                                            <div className="absolute right-6 top-9 mt-2 p-3 rounded bg-gray-500 shadow text-white z-10">
                                                <h2
                                                    className="cursor-pointer hover:underline"
                                                    onClick={() => handleSelectedUpdateUser(user)}
                                                >
                                                    Update
                                                </h2>
                                                <div className='border border-gray-black my-2 w-full'></div>
                                                <h2
                                                    className="cursor-pointer hover:underline"
                                                    onClick={() => handleDeleteUser(user?.id)}
                                                >
                                                    Delete
                                                </h2>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {Users && Users?.total_pages > 1 && (
                <Pagination
                    totalPage={Users?.total_pages}
                    handlePagination={handlePagination}
                    page={page}
                    visiblePagination={visiblePagination}
                />
            )}

            <AddUserModal show={showModalCreateUser} onClose={() => setShowModalCreateUser(false)} />
            <UpdateUserModal show={showModalUpdateUser} onClose={() => setShowModalUpdateUser(false)} data={dataUser} />

        </div>
    );
}

export default User;