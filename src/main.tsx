import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import { render } from 'solid-js/web';
import {lazy} from 'solid-js';
import { Router } from '@solidjs/router';

const routes = [
    {
        path: '/',
        component: lazy(() => import('./modules/store/presentation/pages/Home.tsx')),
    },
    {
        path: '/search/:category',
        component: lazy(() => import('./modules/store/presentation/pages/Shop.tsx')),
    }
]

const App = () => {
    return (
            <Router>
                {routes}
            </Router>
    )
}


const root = document.getElementById('app');

if (!root) {
    throw new Error('Root element not found');
}

render(() => <App />, root)
