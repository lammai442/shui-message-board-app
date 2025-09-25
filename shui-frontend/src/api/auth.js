import axios from 'axios';

export const loginApi = async (data) => {
	const response = await axios
		.post(
			'https://v2yvbkvd05.execute-api.eu-north-1.amazonaws.com/api/auth/login',
			data
		)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error;
		});

	return response;
};

export const registerApi = async (data) => {
	const response = await axios
		.post(
			'https://v2yvbkvd05.execute-api.eu-north-1.amazonaws.com/api/auth/register',
			data
		)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error;
		});
	return response;
};
