import middy from '@middy/core';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { getMessages } from '../../../services/messages.mjs';

export const handler = middy(async () => {
	const response = await getMessages();
	console.log('RESPONSE: ', response);

	if (response) {
		return sendResponses(200, {
			success: true,
			message: 'Successfully getting all messages',
			data: response,
		});
	} else {
		return sendResponses(404, {
			success: false,
			message: 'Could not find any messages',
		});
	}
}).use(errorHandler());
