import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { getUser } from '../../../services/users.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { verifyToken } from '../../../utils/jwt.mjs';
import { validateMessage } from '../../../middlewares/validateMessage.mjs';
import { newMessage } from '../../../services/messages.mjs';

export const handler = middy(async (event) => {
	const authHeader =
		event.headers.Authorization || event.headers.authorization;
	const { username } = event.body;

	if (!authHeader)
		return sendResponses(404, { message: 'Missing Authorization header' });

	const token = authHeader.slice(7);

	const validToken = verifyToken(token);

	if (!validToken) {
		return sendResponses(404, { message: 'Token is invalid' });
	}

	let { attributes: user } = await getUser(username);
	console.log('USER: ', user);

	if (user) {
		const response = await newMessage(event.body);
		if (response) {
			return sendResponses(201, {
				success: true,
				message: 'Successfully added message',
			});
		} else {
			return sendResponses(400, {
				success: false,
				message: 'Could not add message',
			});
		}
	} else {
		return sendResponses(404, {
			message: 'Användaren hittas inte i databasen',
		});
	}
})
	.use(httpJsonBodyParser())
	.use(validateMessage())
	.use(errorHandler());
