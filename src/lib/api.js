import axios from 'axios';
import client from '../config/contentful';

export const sendPostRequest = async (data, api) => {
	const response = await axios.post(api, data, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});

	return response;
};

export const sendContactRequest = async () => {
	const res = await client.getEntries({ content_type: 'contacts' });

	const data = {
		address: res.items[0].fields.address,
		index: res.items[0].fields.index,
		phone: res.items[0].fields.phone,
		city_phone: res.items[0].fields.city_phone,
		mail: res.items[0].fields.mail,
		timetable: res.items[0].fields.timetable,
	};

	return data;
};

export const sendCatalogRequest = async () => {
	const res = await client.getEntries({ content_type: 'catalog' });

	const data = res.items.map((item, index) => {
		return {
			name: item.fields.name,
			categories: item.fields.categories.split(', ').map(id => Number(id)),
			icon: item.fields.icon.fields.file.url,
			id: index,
		};
	});

	return data;
};

export const sendMenuRequest = async () => {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`);

	return data;
};

export const sendDefaultPagePropsRequest = async () => {
	const menuData = await sendMenuRequest();
	const catalogData = await sendCatalogRequest();
	const contactData = await sendContactRequest();

	return {
		menuData,
		contactData,
		catalogData,
	};
};
