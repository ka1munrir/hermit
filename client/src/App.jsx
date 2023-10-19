import { useEffect } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom"
import useUserStore from "./hooks/userStore";

import RootLayout from './components/layout/RootLayout'
import Home from './pages/home/Home.jsx'
import LogIn from './pages/login/LogIn.jsx'
import SignUp from './pages/signup/SignUp.jsx'

import Dashboard from './pages/dashboard/Dashboard.jsx'
import Guilds from './pages/guilds/Guilds';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/guilds' element={<Guilds />} />

    </Route>
  )
);

function App() {
  const { updateUser } = useUserStore();
  useEffect(() => {
    fetch("/api/check_session")
      .then((response) => response.json())
      .then((data) => {
        data.username != undefined ? updateUser(data) : null;
        console.log("this is whos logged in", data);
      });
  }, []);

  return <RouterProvider router={router} />
}

export default App
