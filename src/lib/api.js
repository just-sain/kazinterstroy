import axios from 'axios';

export const sendPostRequest = async (data, api) => {
	const response = await axios.post(api, data, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	return response;
};
