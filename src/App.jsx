import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Applayout from './layouts/app.layout'
import LandingPage from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Redirect from './pages/Redirect'
import Link from './pages/Link'

const router = createBrowserRouter([
  {
    element : <Applayout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/auth',
        element:<Auth/>
      },
      {
        path:'/:id',
        element:<Redirect/>
      },
      {
        path:'/link/:id',
        element:<Link/>
      },
      {
        path:'/',
        element:<LandingPage/>
      },
    ]
  }
])
function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
