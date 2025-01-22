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
import ProductDetails from './Pages/ProductDetails';
import Products from './Pages/Products';
import PrivateRoute from './Components/PrivateRoute';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyProfile from './Components/Dashboard/MyProfile';
import AddProduct from './Components/Dashboard/AddProduct';
import MyProducts from './Components/Dashboard/MyProducts';

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
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/products/:id",
        element: <ProductDetails></ProductDetails>,
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
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <Dashboard></Dashboard>
    </PrivateRoute>,
    children: [
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "myProducts",
        element: <MyProducts></MyProducts>,
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <div className='max-w-screen-xl mx-auto'>
    <RouterProvider router={router} />
    </div>
    </AuthProvider>
  </StrictMode>,
)
