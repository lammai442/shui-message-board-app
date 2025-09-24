import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { getUser, registerUser } from '../../../services/users.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { validateUser } from '../../../middlewares/validateUser.mjs';

export const handler = middy(async (event) => {
	const existingUser = await getUser(event.body.username);

	if (!existingUser) {
		const response = await registerUser(event.body);
		if (response) {
			return sendResponses(201, { message: 'User created successfully' });
		} else {
			return sendResponses(404, { message: 'User could not be created' });
		}
	} else {
		return sendResponses(404, {
			message: `Username ${event.body.username} is already taken`,
		});
	}
})
	.use(httpJsonBodyParser())
	.use(validateUser())
	.use(errorHandler());
