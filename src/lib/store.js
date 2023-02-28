import { parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useReducer } from 'react';

const initialState = {
	cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
	menu: null,
	catalog: null,
	contact: {
		address: '',
		index: '',
		phone: '',
		city_phone: '',
		mail: '',
		timetable: '',
	},
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_CONTACT': {
			return { ...state, contact: action.payload };
		}
		case 'ADD_MENU': {
			return { ...state, menu: action.payload };
		}
		case 'ADD_CATALOG': {
			return { ...state, catalog: action.payload };
		}
		case 'ADD_CART': {
			return { ...state, cart: action.payload };
		}
		case 'CART_ADD_ITEM': {
			const newItem = action.payload;

			const newCartItems = [...state.cart.cartItems, newItem];

			setCookie(null, 'cartItems', JSON.stringify(newCartItems), {
				maxAge: 30 * 24 * 60 * 60,
				path: '/',
			});

			return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
		}
		case 'CART_REMOVE_ITEM': {
			const filteredCartItems = state.cart.cartItems.filter(item => item.article !== action.payload.article);

			// Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
			// destroyCookie(null, 'cart'); // to destroy the cookie
			setCookie(null, 'cartItems', JSON.stringify(filteredCartItems), {
				maxAge: 30 * 24 * 60 * 60,
				path: '/',
			});

			return { ...state, cart: { ...state.cart, cartItems: filteredCartItems } };
		}
		case 'CART_CLEAR_ITEMS': {
			return { ...state, cart: { ...state.cart, cartItems: [] } };
		}
		case 'SAVE_SHIPPING_ADDRESS': {
			return {
				...state,
				cart: {
					...state.cart,
					shippingAddress: {
						...state.cart.shippingAddress,
						...action.payload,
					},
				},
			};
		}
		case 'SAVE_PAYMENT_METHOD': {
			return {
				...state,
				cart: {
					...state.cart,
					paymentMethod: action.payload,
				},
			};
		}
		default: {
			return state;
		}
	}
};

export const StoreContext = createContext({
	dispatch: action => '',
	state: initialState,
});

export const Store = createContext({
	...initialState,
	...StoreContext,
});

export const StoreProvider = ({ children, contactData, catalogData, menuData }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const cookies = parseCookies();

	useEffect(() => {
		// cart
		dispatch({
			type: 'ADD_CART',
			payload: !cookies.cartItems
				? { cartItems: [], shippingAddress: {}, paymentMethod: '' }
				: { cartItems: JSON.parse(cookies.cartItems), shippingAddress: {}, paymentMethod: '' },
		});

		// contact
		dispatch({
			type: 'ADD_CONTACT',
			payload: contactData,
		});

		// catalog
		dispatch({
			type: 'ADD_CATALOG',
			payload: catalogData,
		});

		// menu
		dispatch({ type: 'ADD_MENU', payload: menuData });
	}, []);

	const value = { state, dispatch };

	return <Store.Provider value={value}>{children}</Store.Provider>;
};

export default StoreProvider;
