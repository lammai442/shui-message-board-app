import middy from '@middy/core';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { getMessagesByUserId } from '../../../services/messages.mjs';
import { validateUserId } from '../../../middlewares/validateUserId.mjs';

export const handler = middy(async (event) => {
	const { userId } = event.pathParameters;
	const response = await getMessagesByUserId(userId);

	if (response) {
		return sendResponses(200, {
			success: true,
			message: `Successfully fetched messages by ${userId}`,
			data: response,
		});
	} else {
		return sendResponses(404, {
			success: false,
			message: `Could not fetch messages by ${userId}`,
		});
	}
})
	.use(validateUserId())
	.use(errorHandler());
