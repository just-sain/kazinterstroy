import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import client from '../lib/contentful';

export const AppContext = createContext({
	menu: null,
	contact: {
		address: '',
		index: '',
		phone: '',
		city_phone: '',
		mail: '',
		timetable: ''
	}
});

export const AppContextProvider = ({ children }) => {
	const [menuState, setMenuState] = useState(null);
	const [contactState, setContactState] = useState({
		address: '',
		index: '',
		phone: '',
		city_phone: '',
		mail: '',
		timetable: ''
	});

	useEffect(() => {
		client.getEntries({ content_type: 'contacts' }).then(res => {
			setContactState({
				address: res.items[0].fields.address,
				index: res.items[0].fields.index,
				phone: res.items[0].fields.phone,
				city_phone: res.items[0].fields.city_phone,
				mail: res.items[0].fields.mail,
				timetable: res.items[0].fields.timetable
			});
		});

		axios
			.get(`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`)
			.then(res => {
				setMenuState(res.data);
			});
	}, []);

	return <AppContext.Provider value={{ contact: contactState, menu: menuState }}>{children}</AppContext.Provider>;
};
