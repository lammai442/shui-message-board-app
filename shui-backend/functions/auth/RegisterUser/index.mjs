import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { getUser, registerUser } from '../../../services/users.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { validateUser } from '../../../middlewares/validateUser.mjs';
import { generateToken } from '../../../utils/jwt.mjs';

export const handler = middy(async (event) => {
	const existingUser = await getUser(event.body.username);

	if (!existingUser) {
		const response = await registerUser(event.body);
		if (response) {
			const token = generateToken({
				username: event.body.username,
			});
			return sendResponses(201, {
				message: 'User created successfully',
				avatar: response.avatar,
				email: response.email,
				username: response.username,
				token: `Bearer ${token}`,
				gender: response.gender,
			});
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
