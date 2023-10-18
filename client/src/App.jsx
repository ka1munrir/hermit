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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Route>
  )
);

function App() {
  const { updateUser } = useUserStore();
  useEffect(() => {
    fetch("/api/check_session")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.username);
        data.username != undefined ? updateUser(data) : null;
        console.log("this is whos logged in", data);
        // console.log(user);
      });
  }, []);
  
  return <RouterProvider router = {router}/>
}

export default App
