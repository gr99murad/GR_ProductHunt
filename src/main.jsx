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
import UpdateProduct from './Components/Dashboard/UpdateProduct';
import ProductReviewQueue from './Components/Dashboard/ModeratorDashboard/ProductReviewQueue';
import ReportedContents from './Components/Dashboard/ModeratorDashboard/ReportedContents';
import StatisticsPage from './Components/Dashboard/AdminDashboard/StatisticsPage';
import ManageUsers from './Components/Dashboard/AdminDashboard/ManageUsers';
import ManageCoupons from './Components/Dashboard/AdminDashboard/ManageCoupons';

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
    ],
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
    element: (
      <PrivateRoute allowedRoles={["user", "moderator", "admin"]}>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "myProfile",
        element: (
          <PrivateRoute allowedRoles={["user", "moderator", "admin"]}>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "addProduct",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "myProducts",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myProducts/updateProduct/:id",
        element: <UpdateProduct></UpdateProduct>,
      },
      {
        path: "productReviewQueue",
        element: <PrivateRoute allowedRoles={["moderator"]}>
          <ProductReviewQueue></ProductReviewQueue>
        </PrivateRoute>,
      },
      {
        path: "reportedContents",
        element: <PrivateRoute allowedRoles={["moderator"]}>
          <ReportedContents></ReportedContents>
        </PrivateRoute>,
      },
      {
        path: "statistics",
        element: <PrivateRoute allowedRoles={["admin"]}>
          <StatisticsPage></StatisticsPage>
        </PrivateRoute>,
      },
      {
        path: "manageUsers",
        element: <PrivateRoute allowedRoles={["admin"]}>
          <ManageUsers></ManageUsers>
        </PrivateRoute>,
      },
      {
        path: "manageCoupons",
        element: <PrivateRoute allowedRoles={["admin"]}>
          <ManageCoupons></ManageCoupons>
        </PrivateRoute>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <div>
    <RouterProvider router={router} />
    </div>
    </AuthProvider>
  </StrictMode>,
)
