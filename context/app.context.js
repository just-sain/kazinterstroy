import { createContext, useEffect, useState } from 'react';
import client from '../lib/contentful';

export const AppContext = createContext({
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
	}, []);

	return <AppContext.Provider value={{ contact: contactState }}>{children}</AppContext.Provider>;
};
