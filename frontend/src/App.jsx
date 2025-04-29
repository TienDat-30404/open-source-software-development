import { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes/publicRoutes';
import { privateRoutes } from './routes/privateRoutes';

import RoomsPage from './pages/Room/RoomsPage';
import ChatRoom from './pages/Chat/ChatRoom';
import ManageRooms from './pages/Room/ManageRoom';
import ManagePlans from './pages/plans/MangePlans';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        {/* <AuthProvider> */}
        <Routes>
          {publicRoutes.map((route, i) => {
            let Page = route.page;
            let Layout = route.layout || Fragment;

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

          {privateRoutes.map((route, i) => {
            let Page = route.page
            let Layout = route.layout || Fragment

            return (
              <Route
                key={i}
                path={route.path}
                element={
                  // <PrivateRoute requireAdmin="true">
                    <Layout>
                      <Page />
                    </Layout>
                  // </PrivateRoute>
                }
              />
            )
          })}



          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/chat/:roomName" element={<ChatRoom />} />
          <Route path="/manageroom" element={<ManageRooms />} />
          <Route path="/plans" element={<ManagePlans />} />
        </Routes>
        {/* </AuthProvider> */}
      </Router>
    </div>
  );
}

export default App;
