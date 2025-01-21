import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayOut from './Pages/MainLayOut';
import Register from './Authentication/Register';
import AuthProvider from './context/AuthContext/AuthProvider';
import Login from './Authentication/Login';
import Home from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ]
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <div className=''>
    <RouterProvider router={router} />
    </div>
    </AuthProvider>
  </StrictMode>,
)
