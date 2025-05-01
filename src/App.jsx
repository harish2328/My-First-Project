import React from 'react'
// import NavbarContainer from './components/navbar/NavbarContainer'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/Routes'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
    <Toaster/>
    <RouterProvider router={routes}/>
    </>
  )
}

export default App