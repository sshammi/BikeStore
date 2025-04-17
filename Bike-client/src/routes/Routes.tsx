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
import FilterProductsPage from "@/pages/filterPages";
import HeroProducts from "@/pages/Admin-pages/heroSection/HeroProducts";
import CreateHeroProduct from "@/pages/Admin-pages/heroSection/HeroAddProdcut";
import EditHeroProductPage from "@/pages/Admin-pages/heroSection/HeroUpdateProduct";
import HeroProductDetailsPage from "@/pages/heroProduct";
import HeroCheckoutPage from "@/pages/User-pages/HeroCheckout";
import CartPage from "@/pages/cart";
import FlashProducts from "@/pages/Admin-pages/FlashProduct";
import AdminHome from "@/pages/Admin-pages/adminHome";
import UserHome from "@/pages/User-pages/UserHome";
import ContactPage from "@/pages/contact";
import AdminMessages from "@/pages/Admin-pages/Message";
import TrendingProducts from './../pages/Admin-pages/Trending';
import PopularProducts from "@/pages/Admin-pages/Popular";
import ElectricProducts from "@/pages/Admin-pages/ElectricProduct";
import UpcommingProducts from "@/pages/Admin-pages/UpcommingProduct";
import BrandPage from "@/pages/brand";
import ModelPage from "@/pages/model";
import TrendingBike from "@/pages/homeToNavigate/trending";
import BudgetPage from "@/pages/budget";
import PopularBike from "@/pages/homeToNavigate/popular";
import UpcomingBike from "@/pages/homeToNavigate/upcoming";
import Scooters from "@/pages/homeToNavigate/scooters";
import Mileage from "@/pages/homeToNavigate/mileage";
import Sports from "@/pages/homeToNavigate/sports";

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
                path:'filterProduct',
                element:<FilterProductsPage/>
            },
            {
                path:'about',
                element:<About></About>
            },
            {
                path:'contact',
                element:<ContactPage/>
            },
            {
                path:'cart',
                element:<CartPage/>
            },
            {
                path:'trending',
                element:<TrendingBike/>
            },
            {
                path:'popular',
                element:<PopularBike/>
            },
            {
                path:'upcoming',
                element:<UpcomingBike/>
            },
            {
                path:'scooters',
                element:<Scooters/>
            },
            {
                path:'mileage',
                element:<Mileage/>
            },
            {
                path:'sports',
                element:<Sports/>
            },
            {
                path:'product-details/:id',
                element:<ProductDetailsPage></ProductDetailsPage>
            },
            {
                path:'heroProduct-details/:id',
                element:<HeroProductDetailsPage/>
            },
            {
                path:'brands/:brandName',
                element:<BrandPage/>
            },
            {
                path:'models/:model',
                element:<ModelPage/>
            },
            {
                path:'/budgets/:budgetRange',
                element:<BudgetPage/>
            },
            {
                path:'checkout/:id',
                element:<ProtectedRoute role={"customer"}><CheckoutPage></CheckoutPage></ProtectedRoute>
            },
            {
                path:'heroCheckout/:id',
                element:<ProtectedRoute role={"customer"}><HeroCheckoutPage/></ProtectedRoute>
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
                element: <AdminHome/>
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
                path: 'hero',
                element:<HeroProducts/>
            },
            {
                path: 'flash',
                element:<FlashProducts/>
            },
            {
                path: 'trending',
                element:<TrendingProducts/>
            },
            {
                path: 'popular',
                element:<PopularProducts/>
            },
            {
                path: 'electric',
                element:<ElectricProducts/>
            },
            {
                path: 'upcomming',
                element:<UpcommingProducts/>
            },
            {
                path: 'add-hero',
                element:<CreateHeroProduct/>
            }, 
            {
                path: 'edit-hero/:id',
                element:<EditHeroProductPage/>
            },
            {
                path: 'orders',
                element:<Orders></Orders>
            },
            {
                path: 'msg',
                element:<AdminMessages/>
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
                element: <UserHome/>
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
