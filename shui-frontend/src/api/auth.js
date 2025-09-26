import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

export const loginApi = async (data) => {
	const response = await axios
		.post(
			'https://v2yvbkvd05.execute-api.eu-north-1.amazonaws.com/api/auth/login',
			data
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

export const registerApi = async (data) => {
	const response = await axios
		.post(
			'https://v2yvbkvd05.execute-api.eu-north-1.amazonaws.com/api/auth/register',
			data
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

export const updateUserApi = async (data) => {
	const token = useAuthStore.getState().user.token;

	const response = await axios
		.patch(
			'https://v2yvbkvd05.execute-api.eu-north-1.amazonaws.com/api/auth/user',
			data,
			{
				headers: {
					Authorization: `Bearer s${token}`,
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
