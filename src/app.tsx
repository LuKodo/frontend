import { Home } from "./pages/Home";
import { Router, Route } from "wouter";
import { CheckBill } from "./pages/shop/CheckBill";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/main.css'
import { EditCategory } from "./pages/admin/Categorias/EditCategory";
import { Admin } from "./pages/admin";
import { Categories } from "./pages/admin/Categorias/Categories";
import { Shop } from "./pages/shop/Shop";


export function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/bill" component={CheckBill} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin" component={EditCategory} />
      <Route path="/admin" component={Categories} />
    </Router>
  )
}
