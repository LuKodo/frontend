import '@/assets/css/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { Router, Route } from "wouter";

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

const Loading = () => (
  <div className="cover-loading">
    <div
      className="spinner-border text-warning mt-5 me-4"
      role="status"
      style={{ width: "8rem", height: "8rem" }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
    <img src='/logo.png' className="mt-5" alt="Logo" />
  </div>
);

export function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/shop/:category" component={Shop} />
          <Route path="/bill" component={CheckBill} />

          <Route path="/login" component={Login} />
          <ProtectedRoute path="/admin/products">
            <Products />
          </ProtectedRoute>
          <ProtectedRoute path="/admin/categories">
            <Categories />
          </ProtectedRoute>
          <ProtectedRoute path="/admin/carousel">
            <Carousel />
          </ProtectedRoute>
          <ProtectedRoute path="/admin/promo">
            <Promotion />
          </ProtectedRoute>
        </Router>
      </Suspense>
    </AuthProvider>
  )
}
