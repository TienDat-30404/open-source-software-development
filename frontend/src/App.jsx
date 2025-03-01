import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes/publicRoutes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          {publicRoutes.map((route, i) => {
            let Page = route.page
            let Layout = route.layout 
            if(route.layout)
            {
              Layout = route.layout
            }
            else if(route.layout === null)
            {
              Layout = Fragment
            }
            return (
              <Route
                key = {i}
                path = {route.path}
                element = {
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App
