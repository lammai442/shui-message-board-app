import middy from '@middy/core';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { verifyToken } from '../../../utils/jwt.mjs';
import { deleteMessage } from '../../../services/messages.mjs';
import { validateDeleteParams } from '../../../middlewares/validateDeleteParams.mjs';

export const handler = middy(async (event) => {
	const authHeader =
		event.headers.Authorization || event.headers.authorization;

	if (!authHeader)
		return sendResponses(401, { message: 'Missing Authorization header' });

	const token = authHeader.slice(7);

	const validToken = verifyToken(token);

	if (!validToken) {
		return sendResponses(401, { message: 'Token is invalid' });
	}
	const { msgId, userId } = event.pathParameters;

	if (msgId && userId) {
		const response = await deleteMessage(msgId, userId);

		return sendResponses(200, {
			response,
		});
	} else {
		return sendResponses(400, {
			message: 'MessageId must be included in params',
		});
	}
})
	.use(validateDeleteParams())
	.use(errorHandler());
