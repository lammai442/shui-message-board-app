import axios from 'axios';

export const getMessages = async () => {
	const response = await axios
		.get(
			'https://v2yvbkvd05.execute-api.eu-north-1.amazonaws.com/api/messages'
		)
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
export const postMessage = async (data, token) => {
	const response = await axios
		.post(
			'https://v2yvbkvd05.execute-api.eu-north-1.amazonaws.com/api/messages',
			data,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
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
