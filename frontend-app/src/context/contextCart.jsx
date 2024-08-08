import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const itemIndex = prevCart.findIndex((i) => i._id === item._id);
            if (itemIndex !== -1) {
                const newCart = [...prevCart];
                newCart[itemIndex].quantity += 1;
                return newCart;
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const updateQuantity = (itemId, change) => {
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if (item._id === itemId) {
                    const newQuantity = item.quantity + change;
                    return { ...item, quantity: Math.max(newQuantity, 1) }; // Ensure quantity is at least 1
                }
                return item;
            });
        });
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
