import { Home } from "./pages/Home";
import { Router, Route } from "wouter";
import { CheckBill } from "./pages/CheckBill";


export function App() {

  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/bill" component={CheckBill} />
    </Router>
  )
}
