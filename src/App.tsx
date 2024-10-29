import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LayoutStore from './presentation/components/LayoutStore.tsx';
import Promotions from "./presentation/pages/Promotions.tsx";
import {Shop} from "./presentation/pages/Shop.tsx";

const App = () => {
    return (
        <Router>
            <LayoutStore>
                <Routes>
                    <Route path="/" element={<Promotions />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/cart" element={<div>Carrito de Compras (En desarrollo)</div>} />
                    <Route path="/profile" element={<div>Perfil de Usuario (En desarrollo)</div>} />
                </Routes>
            </LayoutStore>
        </Router>
    );
};

export default App;