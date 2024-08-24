import './assets/css/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Router, Route } from "wouter";

import { Home } from "./pages/shop/Home";
import { CheckBill } from "./pages/shop/CheckBill";
import { Categories } from "./pages/admin/Categories";
import { Shop } from "./pages/shop/Shop";
import { Carousel } from './pages/admin/Carousel';
import { Promotion } from './pages/admin/Promotion';
import { Products } from './pages/admin/Products';


export function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/shop/:category" component={Shop} />
      <Route path="/bill" component={CheckBill} />

      <Route path="/admin/products" component={Products} />
      <Route path="/admin/categories" component={Categories} />
      <Route path="/admin/carousel" component={Carousel} />
      <Route path="/admin/promo" component={Promotion} />
    </Router>
  )
}
