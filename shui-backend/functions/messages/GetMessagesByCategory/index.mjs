import middy from '@middy/core';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { getMessagesByCategory } from '../../../services/messages.mjs';
import { validateCategory } from '../../../middlewares/validateCategory.mjs';

export const handler = middy(async (event) => {
	const { category } = event.pathParameters;
	const response = await getMessagesByCategory(category);

	if (response) {
		return sendResponses(200, {
			success: true,
			message: `Successfully fetched messages in category ${category}`,
			data: response,
		});
	} else {
		return sendResponses(404, {
			success: false,
			message: `Could not fetch messages in category ${category}`,
		});
	}
})
	.use(validateCategory())
	.use(errorHandler());
