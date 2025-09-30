import axios from 'axios';

export const postMessage = async (data, token) => {
	const response = await axios
		.post('', data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((response) => {
			return {
				success: true,
				data: response.data,
				status: response.status,
			};
		})
		.catch((error) => {
			return {
				success: false,
				data: error.response?.data || { message: error.message },
				status: error.response?.status || 500,
			};
		});
	return response;
};
