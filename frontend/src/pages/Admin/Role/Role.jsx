import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import Pagination from '../../../components/Pagination/Pagination';
import { visiblePagination } from '../../../until/function';
import { useDeleteCategory, useGetAllCatgory } from '../../../hooks/useCategory';

import { useSelector } from 'react-redux';
import { useDeleteRole, useGetAllRole } from '../../../hooks/useRole';
import AddRoleModal from './AddRoleModal';
import UpdateRoleModal from './UpdateRoleModal';
function Role() {
  const { accessToken } = useSelector(state => state.auth)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(5)
  // let query = `/?page=${page}&size=${size}`
  const { data: roles, isLoading, isError, error } = useGetAllRole("", accessToken)
  console.log("roles", roles)
  const [showModalAddRole, setShowModalAddRole] = useState(false)
  const [showModalUpdateRole, setShowModalUpdateRole] = useState(false)
  const [dataRole, setDataRole] = useState(null)
  const [selectedRole, setSelectedRole] = useState(null)
  const deleteRoleMutation = useDeleteRole()

  const handleSelectedRole = (role) => {
    if (selectedRole === null) {
      setSelectedRole(role)
    }
    else {
      setSelectedRole(null)
    }
  }
  const handleSelectedUpdateRole = (role) => {
    setDataRole(role)
    setShowModalUpdateRole(true)
  }

  const handleDeleteRole = (id) => {
    deleteRoleMutation.mutate({ id: id, token: accessToken })
  }

  const handlePagination = (newPage) => {
    if (newPage >= 1 && (categories?.next || categories?.previous)) {
      setPage(newPage)
    }
  }
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white rounded-md shadow-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setShowModalAddRole(true)}
            className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add Role
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
                  Name
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
              {roles && roles?.data?.length > 0 && roles?.data?.map((role, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="ml-2 text-sm font-medium text-gray-900">
                      {(role?.id).slice(0, 10)}...
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2">
                    {role?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(role?.created_at).toLocaleString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(role?.updated_at).toLocaleString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                      onClick={() => handleSelectedRole(role?.id)}
                    >
                      <MoreHorizontal />
                    </button>
                    {selectedRole === role?.id && (
                      <div className="absolute right-6 top-9 mt-2 p-3 rounded bg-gray-500 shadow text-white z-10">
                        <h2
                          className="cursor-pointer hover:underline"
                          onClick={() => handleSelectedUpdateRole(role)}
                        >
                          Update
                        </h2>
                        <div className='border border-gray-black my-2 w-full'></div>
                        <h2
                          className="cursor-pointer hover:underline"
                          onClick={() => handleDeleteRole(role?.id)}
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

      {roles && roles?.total_pages > 1 && (
        <Pagination
          totalPage={roles?.total_pages}
          handlePagination={handlePagination}
          page={page}
          visiblePagination={visiblePagination}
        />
      )}

      <AddRoleModal show={showModalAddRole} onClose={() => setShowModalAddRole(false)} />
      <UpdateRoleModal show={showModalUpdateRole} onClose={() => setShowModalUpdateRole(false)} data={dataRole} />

    </div>
  );
}

export default Role;