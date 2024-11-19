import { AuthProvider } from './admin/presentation/contexts/AuthContext';
import { Loading } from './components/Loading';

import 'bootstrap-icons/font/bootstrap-icons.css';
import { render } from 'solid-js/web';
import { lazy, Suspense } from 'solid-js';
import { Route, Router } from '@solidjs/router';

const App = () => (
    <AuthProvider>
        <Suspense fallback={<Loading />}>
            <Router>
                <Route path="/">
                    <Route
                        path="/market/"
                        component={lazy(() => import('./pages/Home'))}
                    />
                    <Route
                        path="/market/shop/:category"
                        component={lazy(() => import('./pages/Shop'))}
                    />
                    <Route
                        path="/market/bill"
                        component={lazy(() => import('./pages/CheckBill'))}
                    />
                    <Route
                        path="/market/login"
                        component={lazy(() => import('./admin/presentation/pages/Login'))}
                    />
                    <Route
                        path="/market/admin/products"
                        component={lazy(() => import('./admin/presentation/pages/Products'))}
                    />
                    <Route
                        path="/market/admin/categories"
                        component={lazy(() => import('./admin/presentation/pages/Categories'))}
                    />
                    <Route
                        path="/market/admin/carousel"
                        component={lazy(() => import('./admin/presentation/pages/Carousel'))}
                    />
                    <Route
                        path="/market/admin/promo"
                        component={lazy(() => import('./admin/presentation/pages/Promotion'))}
                    />
                </Route>
            </Router>
        </Suspense>
    </AuthProvider>
)

const root = document.getElementById('app');

if (!root) {
    throw new Error('Root element not found');
}

render(() => <App />, root)
