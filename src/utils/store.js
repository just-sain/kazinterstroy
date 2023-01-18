import { createContext, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import client from './contentful';
import axios from 'axios';

const initialState = {
	cart: !Cookies.get('cart')
		? { cartItems: [], shippingAddress: {}, paymentMethod: '' }
		: JSON.parse(Cookies.get('cart')),
	menu: null,
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
		case 'CART_ADD_ITEM': {
			const newItem = action.payload;
			const existItem = state.cart.cartItems.find(item => item.article === newItem.article);

			const cartItems = existItem
				? state.cart.cartItems.map(item => (item.article === existItem.article ? newItem : item))
				: [...state.cart.cartItems, newItem];
			Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));

			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case 'CART_REMOVE_ITEM': {
			const cartItems = state.cart.cartItems.filter(item => item.article !== action.payload.article);
			Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case 'CART_RESET': {
			return {
				...state,
				cart: {
					cartItems: Cookies.get('cart')
						? JSON.parse(Cookies.get('cart'))
						: { cartItems: [], shippingAddress: {}, paymentMethod: '' }
				}
			};
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
	state: { cart: [] }
});

export const Store = createContext({
	...initialState,
	...StoreContext
});

const loadMenu = async () => {
	const res = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
	);
	console.log(res.data);

	return res.data;
};

const loadContact = async () => {
	const contact = await client.getEntries({ content_type: 'contacts' });
	return contact.items[0].fields;
};

export const StoreProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		client.getEntries({ content_type: 'contacts' }).then(res => {
			dispatch({
				type: 'ADD_CONTACT',
				payload: {
					address: res.items[0].fields.address,
					index: res.items[0].fields.index,
					phone: res.items[0].fields.phone,
					city_phone: res.items[0].fields.city_phone,
					mail: res.items[0].fields.mail,
					timetable: res.items[0].fields.timetable
				}
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
