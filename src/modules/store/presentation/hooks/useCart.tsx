import { createStore } from "solid-js/store"
import { Product, Productofinal } from "../../../../admin/domain/entities/ProductoFinal";

export const useCart = () => {
    const [cart, setCart] = createStore<Product[]>(JSON.parse(localStorage.getItem('cart') || '') || []);

    const addToCart = (product: Product, move: string = 'add') => {
        const existingProductIndex = cart.findIndex(item => item.product.codigo === product.product.codigo);
        if (existingProductIndex === -1) {
            setCart([...cart, { ...product, quantity: 1 }]);
            localStorage.setItem('cart', JSON.stringify(cart));
            return
        }

        switch (move) {
            case 'add':
                if (cart[existingProductIndex].product.nuevo && cart[existingProductIndex].product.nuevo >= cart[existingProductIndex].quantity + 0.5) {
                    setCart(existingProductIndex, 'quantity', (prev) => (prev || 1) + 0.5)
                }
                break;

            case 'remove':
                if (cart[existingProductIndex].quantity >= 1) {
                    setCart(existingProductIndex, 'quantity', (prev) => (prev || 1) - 0.5)
                }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const removeFromCart = (productId: string) => {
        const updatedCart = cart.filter(item => item.product.codigo !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return { cart, addToCart, removeFromCart }
}