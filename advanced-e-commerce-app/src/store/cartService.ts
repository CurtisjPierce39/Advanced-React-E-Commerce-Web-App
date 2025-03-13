import { Product } from './productService';

export interface CartItem {
    product: Product;
    quantity: number;
    imageUrl: string;
}

export class CartService {
    private static CART_KEY = 'shopping_cart';

    static getCart(): CartItem[] {
        const cart = localStorage.getItem(this.CART_KEY);
        return cart ? JSON.parse(cart) : [];
    }

    static addToCart(product: Product, quantity: number = 1) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ product, quantity, imageUrl });
        }

        localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    }

    static clearCart() {
        localStorage.removeItem(this.CART_KEY);
    }

    static calculateTotal(): number {
        return this.getCart().reduce((total, item) =>
            total + (item.product.price * item.quantity), 0);
    }
}