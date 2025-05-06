import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import { useGetTopSong } from '../../../hooks/useMusicListeningHistory';

function Dashboard() {
  const { data: topSongs, isLoading, isError, error } = useGetTopSong("")
  
  const formatDataForChart = (topSongs) => {
    if(!isLoading)
    {
      return topSongs.map((item) => ({
        name: item.song.title,        // Lấy tên bài hát
        total_count: item.total_count,  // Số lượt nghe
      }));
    }
  }

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (isError) {
    return <div>Lỗi: {error.message}</div>;
  }

  // Chuyển đổi dữ liệu cho biểu đồ
  const chartData = formatDataForChart(topSongs?.results);


  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3>Thống kê 10 bài hát nghe nhiều nhất</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" /> {/* Tên bài hát */}
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;



// import React, { useState, useEffect } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
// } from 'recharts';

// function Dashboard() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Dữ liệu động giả lập
//   const fetchData = () => {
//     setLoading(true);

//     // Giả lập dữ liệu từ API hoặc từ một nguồn bên ngoài
//     const dynamicData = [
//       { song: { name: "Bài hát A" }, total_count: 120 },
//       { song: { name: "Bài hát B" }, total_count: 95 },
//       { song: { name: "Bài hát C" }, total_count: 75 },
//       { song: { name: "Bài hát D" }, total_count: 50 },
//     ];

//     // Set dữ liệu vào state sau khi giả lập "API" trả về
//     setData(dynamicData);
//     setLoading(false);
//   };

//   // Tự động gọi hàm fetchData khi component được mount
//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (loading) {
//     return <div>Đang tải dữ liệu...</div>;
//   }

//   return (
//     <div style={{ width: '100%', height: 400 }}>
//       <h3>Thống kê bài hát nghe nhiều</h3>
//       <ResponsiveContainer>
//         <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="song.name" /> {/* Dùng song.name trong data */}
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="total_count" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default Dashboard;
