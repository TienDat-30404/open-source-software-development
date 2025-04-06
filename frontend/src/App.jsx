import { Fragment, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes/publicRoutes';

import RoomsPage from './pages/Room/RoomsPage';
import ChatRoom from './pages/Chat/ChatRoom';
import ManageRooms from './pages/Room/ManageRoom';
import ManagePlans from './pages/plans/MangePlans';
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Router>
        <Routes>
          {publicRoutes.map((route, i) => {
            let Page = route.page;
            let Layout = route.layout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={i}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/chat/:roomName" element={<ChatRoom />} />
          <Route path="/manageroom" element={<ManageRooms />} />
          <Route path="/plans" element={<ManagePlans />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
