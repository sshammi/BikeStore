import Dashboard from "@/Layout/Dashboard-admin";
import UserDashboard from "@/Layout/Dashboard-user";
import Mainlayout from "@/Layout/Mainlayout";
import ProtectedRoute from "@/Layout/ProtectedRoute";
import About from "@/pages/about";
import AddProduct from "@/pages/Admin-pages/AddProducts";
import Orders from "@/pages/Admin-pages/Orders";
import Products from "@/pages/Admin-pages/Products";
import EditProductPage from "@/pages/Admin-pages/UpdateProduct";
import Users from "@/pages/Admin-pages/Users";
import ViewOrder from "@/pages/Admin-pages/viewOrder";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import AllProductsPage from "@/pages/product";
import ProductDetailsPage from "@/pages/ProductDetails";
import RegisterPage from "@/pages/Register";
import ChangePassword from "@/pages/User-pages/change-password";
import CheckoutPage from "@/pages/User-pages/CheckOut";
import Payment from "@/pages/User-pages/Payment";
import CustomerProfilePage from "@/pages/User-pages/Profile";
import CustomerOrders from "@/pages/User-pages/showOrder";
import { createBrowserRouter } from "react-router-dom";
import VerifyOrder from "../pages/User-pages/VerifyOrder";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Mainlayout></Mainlayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'register',
                element:<RegisterPage></RegisterPage>
            },
            {
                path:'login',
                element:<Login></Login>
            },
            {
                path:'products',
                element:<AllProductsPage></AllProductsPage>
            },
            {
                path:'about',
                element:<About></About>
            },
            {
                path:'product-details/:id',
                element:<ProductDetailsPage></ProductDetailsPage>
            },
            {
                path:'checkout/:id',
                element:<ProtectedRoute role={"customer"}><CheckoutPage></CheckoutPage></ProtectedRoute>
            },
            {
                path:'payment',
                element:<ProtectedRoute role={"customer"}><Payment></Payment></ProtectedRoute>
            },
            {
                path: 'verifyOrder',
                element:<ProtectedRoute role={"customer"}><VerifyOrder></VerifyOrder></ProtectedRoute>
            },
        ]
    },
    {
        path:'dashboard-admin',
        element:<ProtectedRoute role={"admin"}>
                <Dashboard></Dashboard>
           </ProtectedRoute>,
        children:[
            {
                path: '',
                element: <h1 className="text-clor-gray-800">Welcome your dashboard</h1>
            },
            {
                path: 'users',
                element:<Users></Users>
            },
            {
                path: 'products',
                element:<Products></Products>
            },
            {
                path: 'add-product',
                element:<AddProduct></AddProduct>
            }, 
            {
                path: 'edit-product/:id',
                element:<EditProductPage></EditProductPage>
            },
            {
                path: 'orders',
                element:<Orders></Orders>
            },
            {
                path: 'viewOrder/:id',
                element:<ViewOrder></ViewOrder>
            },
            
        ]

    },
    {
        path:'dashboard-user',
        element:<ProtectedRoute role={"customer"}>
                  <UserDashboard></UserDashboard>
                </ProtectedRoute>,
        children:[
            {
                path:'',
                element: <h1 className="text-center text-gray-800 px-11 py-6">Welcome to Dashboard</h1>
            },
            {
                path: 'change-password',
                element:<ChangePassword></ChangePassword>
            },
            {
                path: '',
                element:<CustomerProfilePage></CustomerProfilePage>
            },
            {
                path: 'profile',
                element:<CustomerProfilePage></CustomerProfilePage>
            },
            {
                path: 'orders',
                element:<CustomerOrders></CustomerOrders>
            },
            
        ]

    }
])
