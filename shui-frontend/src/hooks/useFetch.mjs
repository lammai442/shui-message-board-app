import { getMessagesByUserId } from '../api/message';

export const fetchMessagesByUserId = async (userId) => {
	try {
		const response = await getMessagesByUserId(userId);
		return { success: true, status: 200, data: response.data.data };
	} catch (error) {
		console.error(
			`Kunde inte hämta meddelanden för ${selectedCategory}`,
			error
		);
		return { success: false, error: error.msg };
	}
};
