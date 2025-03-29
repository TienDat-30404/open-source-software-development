import React, { Fragment } from 'react'
import { Minus, CircleCheck } from 'lucide-react'
export default function Benefit() {
    return (
        <div className='flex flex-col items-center justify-center mt-10'>
            <h1 className='text-3xl font-bold'>Trải nghiệm sự khác biệt</h1>
            <h5 className='text-lg font-semibold mt-2'>Dùng Premium để nắm toàn quyền kiểm soát trải nghiệm nghe nhạc. Hủy bất cứ lúc nào.</h5>
            <div className=" text-white p-8">
                <div className="grid grid-cols-3 gap-y-4 mt-2 w-[500px]">
                    {/* Hàng tiêu đề */}
                    <div className='col-span-3 flex items-center justify-between'>
                        <p className="font-semibold w-3/5"></p>
                        <p className="font-semibold max-w-[85px] ">Gói Free của Spotify</p>
                        <p className="font-semibold">Premium</p>
                    </div>

                    <div className="col-span-3">
                        <h5 className="text-base font-semibold mb-6">Lợi ích dành cho bạn</h5>
                    </div>

                    <div className="col-span-3 border-b border-gray-600 pb-3 flex items-center justify-between">
                        <p className="font-base w-1/2">Nghe nhạc không quảng cáo</p>
                        <Minus />
                        <CircleCheck />
                    </div>




                    <div className="col-span-3 border-b border-gray-600 py-3 flex items-center justify-between">

                        <p className="font-base w-1/2">Tải bài hát xuống</p>
                        <Minus />
                        <CircleCheck />
                    </div>

                    <div className="col-span-3 border-b border-gray-600 py-3 flex items-center justify-between">
                        <p className="font-base w-1/2">Phát nhạc theo thứ tự bất kỳ</p>
                        <Minus />
                        <CircleCheck />
                    </div>

                    <div className="col-span-3 border-b border-gray-600 py-3 flex items-center justify-between">
                        <p className="font-base w-1/2">Âm thanh chất lượng cao</p>
                        <Minus />
                        <CircleCheck />
                    </div>

                    <div className="col-span-3 border-b border-gray-600 py-3 flex items-center justify-between">
                        <p className="font-base w-1/2">Nghe cùng bạn bè theo thời gian thực</p>
                        <Minus />
                        <CircleCheck />
                    </div>

                </div>
            </div>
        </div>
    )
}
