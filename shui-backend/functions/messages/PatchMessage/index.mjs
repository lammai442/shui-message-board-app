import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { verifyToken } from '../../../utils/jwt.mjs';
import { editMessage, newMessage } from '../../../services/messages.mjs';
import { validateEditMessage } from '../../../middlewares/validateEditMessage.mjs';

export const handler = middy(async (event) => {
	const authHeader =
		event.headers.Authorization || event.headers.authorization;
	const msgData = event.body;

	if (!authHeader)
		return sendResponses(404, { message: 'Missing Authorization header' });

	const token = authHeader.slice(7);

	const validToken = verifyToken(token);

	if (!validToken) {
		return sendResponses(404, { message: 'Token is invalid' });
	}

	if (msgData) {
		const response = await editMessage(msgData);
		if (response) {
			return sendResponses(201, {
				success: true,
				message: 'Successfully edit message',
				newMessage: response,
			});
		} else {
			return sendResponses(400, {
				success: false,
				response: response,
				message: 'Could not edit message',
			});
		}
	} else {
		return sendResponses(404, {
			message: 'Meddelandet kunde inte ändras i databasen',
		});
	}
})
	.use(httpJsonBodyParser())
	.use(validateEditMessage())
	.use(errorHandler());
