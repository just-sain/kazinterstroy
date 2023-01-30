import { createContext, useEffect, useReducer } from 'react';
import { parseCookies, setCookie } from 'nookies';
import client from '../config/contentful';
import axios from 'axios';

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
		timetable: ''
	}
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
			const existItem = state.cart.cartItems.find(item => item.article === newItem.article);

			const newCartItems = existItem
				? state.cart.cartItems.map(item => (item.article === existItem.article ? newItem : item))
				: [...state.cart.cartItems, newItem];

			setCookie(null, 'cartItems', JSON.stringify(newCartItems), {
				maxAge: 30 * 24 * 60 * 60,
				path: '/'
			});

			return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
		}
		case 'CART_REMOVE_ITEM': {
			const filteredCartItems = state.cart.cartItems.filter(item => item.article !== action.payload.article);

			// Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
			// destroyCookie(null, 'cart'); // to destroy the cookie
			setCookie(null, 'cartItems', JSON.stringify(filteredCartItems), {
				maxAge: 30 * 24 * 60 * 60,
				path: '/'
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
						...action.payload
					}
				}
			};
		}
		case 'SAVE_PAYMENT_METHOD': {
			return {
				...state,
				cart: {
					...state.cart,
					paymentMethod: action.payload
				}
			};
		}
		default: {
			return state;
		}
	}
};

export const StoreContext = createContext({
	dispatch: action => '',
	state: initialState
});

export const Store = createContext({
	...initialState,
	...StoreContext
});

export const StoreProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const cookies = parseCookies();

	useEffect(() => {
		dispatch({
			type: 'ADD_CART',
			payload: !cookies.cartItems
				? { cartItems: [], shippingAddress: {}, paymentMethod: '' }
				: { cartItems: JSON.parse(cookies.cartItems), shippingAddress: {}, paymentMethod: '' }
		});

		client.getEntries({ content_type: 'contacts' }).then(res => {
			const data = {
				address: res.items[0].fields.address,
				index: res.items[0].fields.index,
				phone: res.items[0].fields.phone,
				city_phone: res.items[0].fields.city_phone,
				mail: res.items[0].fields.mail,
				timetable: res.items[0].fields.timetable
			};

			dispatch({
				type: 'ADD_CONTACT',
				payload: data
			});
		});

		client.getEntries({ content_type: 'catalog' }).then(res => {
			const data = res.items.map((item, index) => {
				return {
					name: item.fields.name,
					categories: item.fields.categories.split(', ').map(id => Number(id)),
					icon: item.fields.icon.fields.file.url,
					id: index
				};
			});

			dispatch({
				type: 'ADD_CATALOG',
				payload: data
			});
		});

		axios
			.get(`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`)
			.then(res => {
				dispatch({ type: 'ADD_MENU', payload: res.data });
			});
	}, []);

	const value = { state, dispatch };

	return <Store.Provider value={value}>{children}</Store.Provider>;
};

export default StoreProvider;
