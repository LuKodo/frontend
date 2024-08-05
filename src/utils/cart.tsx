import { Product, Productofinal } from "../interfaces/interfaces";

const cart: Product[] = [];

export const addToCart = (product: Productofinal, quantity: number) => {
    const cart = localStorage.getItem('cart');
    if (cart) {
        const parsedCart = JSON.parse(cart) as { product: Productofinal, quantity: number }[];
        const existingItem = parsedCart.find((item) => item.product.codigo === product.codigo);

        if (existingItem) {
            existingItem.quantity += quantity;
            parsedCart[parsedCart.indexOf(existingItem)] = existingItem;
        } else {
            parsedCart.push({ product, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(parsedCart));
    } else {
        localStorage.setItem('cart', JSON.stringify([{ product, quantity }]));
    }
}

export const setCart = (cart: Product[]) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const removeFromCart = (product: Productofinal) => {
    const index = cart.findIndex((item) => item.product.codigo === product.codigo);
    if (index !== -1) {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

export const getCart = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        return JSON.parse(storedCart) as { product: Productofinal, quantity: number }[];
    } else {
        return [];
    }
}

export const getCartQuantity = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        const cart = JSON.parse(storedCart) as { product: Productofinal, quantity: number }[];
        return cart.reduce((total) => total + 1, 0);
    } else {
        return 0;
    }
}

export const initCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart.push(...JSON.parse(storedCart));
    }
}