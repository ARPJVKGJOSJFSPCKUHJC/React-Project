import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
	// cart state
	const [cart, setCart] = useState([]);
	// item amount state
	const [itemAmount, setItemAmount] = useState(0);
	// total price state
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const total = cart.reduce((accumulator, currentItem) => {
			// Calculate total based on price * amount
			return accumulator + currentItem.price * currentItem.amount;
		}, 0);
		setTotal(total);
	}, [cart]);

	// update item amount
	useEffect(() => {
		if (cart) {
			const amount = cart.reduce((accumulator, currentItem) => {
				return accumulator + currentItem.amount;
			}, 0);
			setItemAmount(amount);
		}
	}, [cart]);

	// add to cart
	const addToCart = (product, id) => {
		// Set initial amount to 1
		const newItem = { ...product, amount: 1 };
		// check if the item is already in the cart
		const cartItem = cart.find((item) => {
			return item.id === id;
		});
		if (cartItem) {
			const newCart = [...cart].map((item) => {
				if (item.id === id) {
					// Increment amount correctly
					return { ...item, amount: cartItem.amount + 1 };
				} else return item;
			});
			setCart(newCart);
		} else {
			setCart([...cart, newItem]);
		}
	};

	// remove from cart
	const removeFromCart = (id) => {
		const newCart = cart.filter((item) => {
			return item.id !== id;
		});
		setCart(newCart);
	};

	// cleart cart
	const clearCart = () => {
		setCart([]);
	};

	// increase amount
	const increaseAmount = (id) => {
		const cartItem = cart.find((item) => item.id === id);
		addToCart(cartItem, id);
	};

	// decrease amount
	const decreaseAmount = (id) => {
		const cartItem = cart.find((item) => item.id === id);
		if (cartItem) {
			const newCart = cart.map((item) => {
				if (item.id === id) {
					return { ...item, amount: cartItem.amount - 1 };
				} else {
					return item;
				}
			});
			// Filter out items with amount 0
			const filteredCart = newCart.filter((item) => item.amount > 0);
			setCart(filteredCart);
		}
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				clearCart,
				increaseAmount,
				decreaseAmount,
				itemAmount,
				total,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
