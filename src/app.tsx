import '@/assets/css/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Router, Route } from "wouter";

import { Home } from "@/pages/shop/Home";
import { CheckBill } from "@/pages/shop/CheckBill";
import { Categories } from "@/pages/admin/Categories";
import { Shop } from "@/pages/shop/Shop";
import { Carousel } from '@/pages/admin/Carousel';
import { Promotion } from '@/pages/admin/Promotion';
import { Products } from '@/pages/admin/Products';
import Login from '@/pages/admin/Login';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';


export function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}
