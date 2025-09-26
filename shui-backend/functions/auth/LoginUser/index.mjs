import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { getUser } from '../../../services/users.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { validateLogin } from '../../../middlewares/validateLogin.mjs';
import { comparePasswords } from '../../../utils/bcrypt.mjs';
import { generateToken } from '../../../utils/jwt.mjs';

export const handler = middy(async (event) => {
	const response = await getUser(event.body.username);

	if (response) {
		if (
			await comparePasswords(
				event.body.password,
				response.attributes.password
			)
		) {
			const token = generateToken({
				username: response.attributes.username,
			});
			return sendResponses(200, {
				message: 'User logged in successfully',
				avatar: response.attributes.avatar,
				email: response.attributes.email,
				username: response.attributes.username,
				token: token,
				gender: response.attributes.gender,
			});
		} else {
			return sendResponses(400, { message: 'Wrong password' });
		}
	} else {
		return sendResponses(404, { message: 'User not found' });
	}
})
	.use(httpJsonBodyParser())
	.use(validateLogin())
	.use(errorHandler());
