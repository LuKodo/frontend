import { render } from 'preact'
import '@/assets/css/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const Home = lazy(() => import('@/pages/shop/Home'));
const CheckBill = lazy(() => import('@/pages/shop/CheckBill'));
const Categories = lazy(() => import('@/pages/admin/Categories'));
const Shop = lazy(() => import('@/pages/shop/Shop'));
const Carousel = lazy(() => import('@/pages/admin/Carousel'));
const Promotion = lazy(() => import('@/pages/admin/Promotion'));
const Products = lazy(() => import('@/pages/admin/Products'));
const Login = lazy(() => import('@/pages/admin/Login'));
const ProtectedRoute = lazy(() => import('@/components/ProtectedRoute'));
import { AuthProvider } from '@/contexts/AuthContext';
import { Suspense, lazy } from 'preact/compat';
import { Loading } from './components/Loading';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "/market/",
                element: <Home />
            }, {
                path: "/market/shop/:category",
                element: <Shop />
            }, {
                path: "/market/bill",
                element: <CheckBill />
            }, {
                path: "/market/login",
                element: <Login />
            }, {
                path: "/market/admin",
                element: <ProtectedRoute>
                    <Categories />
                </ProtectedRoute>
            }, {
                path: "/market/admin/products",
                element: <ProtectedRoute>
                    <Products />
                </ProtectedRoute>
            }, {
                path: "/market/admin/categories",
                element: <ProtectedRoute>
                    <Categories />
                </ProtectedRoute>
            }, {
                path: "/market/admin/carousel",
                element: <ProtectedRoute>
                    <Carousel />
                </ProtectedRoute>
            }, {
                path: "/market/admin/promo",
                element: <ProtectedRoute>
                    <Promotion />
                </ProtectedRoute>
            }
        ]
    }
])


render(
    <AuthProvider>
        <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
        </Suspense>
    </AuthProvider>,
    document.getElementById('app')!
)