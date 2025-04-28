import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import Pagination from '../../../components/Pagination/Pagination';
import { visiblePagination } from '../../../until/function';
import { useDeleteCategory, useGetAllCatgory } from '../../../hooks/useCategory';

import { useSelector } from 'react-redux';
import { useDeletePlan, useGetAllPlan } from '../../../hooks/usePlan';
import AddPlanModal from './AddPlanModal';
import UpdatePlanModal from './UpdatePlanModal';
function Plan() {
    const { accessToken } = useSelector(state => state.auth)
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(5)
    let query = `/?page=${page}&size=${size}`
    const { data: plans, isLoading, isError, error } = useGetAllPlan(query, accessToken)
    const [showModalCreatePlan, setShowModalCreatePlan] = useState(false)
    const [showModalUpdatePlan, setShowModalUpdatePlan] = useState(false)
    const [dataPlan, setDataPlan] = useState(null)
    const [selectedPlan, setSelectedPlan] = useState(null)
    const deletePlanMutation = useDeletePlan(accessToken)

    const handleSelectedPlan = (plan) => {
        if (selectedPlan === null) {
            setSelectedPlan(plan)
        }
        else {
            setSelectedPlan(null)
        }
    }
    const handleSelectedUpdatePlan = (plan) => {
        setDataPlan(plan)
        setShowModalUpdatePlan(true)
    }

    const handleDeletePlan = (id) => {
        deletePlanMutation.mutate(id)
    }

    const handlePagination = (newPage) => {
        if (newPage >= 1 && (plans?.next || plans?.previous)) {
            setPage(newPage)
        }
    }
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="bg-white rounded-md shadow-md overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <button
                        onClick={() => setShowModalCreatePlan(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add Plan
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
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Duration
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
                            {plans && plans?.data?.length > 0 && plans?.data?.map((plan, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="ml-2 text-sm font-medium text-gray-900">
                                            {(plan?.id).slice(0, 10)}...
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                                        {plan?.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                                        {plan?.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                                        {plan?.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                                        {plan?.duration_days}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(plan?.created_at).toLocaleString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(plan?.updated_at).toLocaleString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                                        <button className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                                            onClick={() => handleSelectedPlan(plan?.id)}
                                        >
                                            <MoreHorizontal />
                                        </button>
                                        {selectedPlan === plan?.id && (
                                            <div className="absolute right-6 top-9 mt-2 p-3 rounded bg-gray-500 shadow text-white z-10">
                                                <h2
                                                    className="cursor-pointer hover:underline"
                                                    onClick={() => handleSelectedUpdatePlan(plan)}
                                                >
                                                    Update
                                                </h2>
                                                <div className='border border-gray-black my-2 w-full'></div>
                                                <h2
                                                    className="cursor-pointer hover:underline"
                                                    onClick={() => handleDeletePlan(plan?.id)}
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

            {plans && plans?.total_pages > 1 && (
                <Pagination
                    totalPage={plans?.total_pages}
                    handlePagination={handlePagination}
                    page={page}
                    visiblePagination={visiblePagination}
                />
            )}

            <AddPlanModal show={showModalCreatePlan} onClose={() => setShowModalCreatePlan(false)} />
            <UpdatePlanModal show={showModalUpdatePlan} onClose={() => setShowModalUpdatePlan(false)} data={dataPlan} />

        </div>
    );
}

export default Plan;