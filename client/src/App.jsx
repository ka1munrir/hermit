import { useState } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom"

import RootLayout from './components/layout/RootLayout'
import Home from './pages/home/Home.jsx'
import LogIn from './pages/login/LogIn.jsx'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/login' element={<LogIn/>}/>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router = {router}/>
    </>
  )
}

export default App
