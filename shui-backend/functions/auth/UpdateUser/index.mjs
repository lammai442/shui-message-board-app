import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { getUser, updateUser } from '../../../services/users.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { comparePasswords } from '../../../utils/bcrypt.mjs';
import { validateUser } from '../../../middlewares/validateUser.mjs';
import { verifyToken } from '../../../utils/jwt.mjs';

export const handler = middy(async (event) => {
	const authHeader =
		event.headers.Authorization || event.headers.authorization;

	if (!authHeader)
		return sendResponses(404, { message: 'Missing Authorization header' });

	const token = authHeader.slice(7);

	const validToken = verifyToken(token);

	if (!validToken) return sendResponses(404, { message: 'Token is invalid' });

	const user = await getUser(event.body.username);
	if (user) {
		if (
			await comparePasswords(
				event.body.password,
				user.attributes.password
			)
		) {
			const updatedUser = await updateUser(event.body);
			console.log('RESPONSE: ', updatedUser);

			return sendResponses(200, {
				message: 'User updated',
				avatar: updatedUser.avatar,
				email: updatedUser.email,
				username: updatedUser.username,
				gender: updatedUser.gender,
			});
		} else {
			return sendResponses(400, { message: 'Wrong password' });
		}
	} else {
		return sendResponses(404, { message: 'User not found' });
	}
})
	.use(httpJsonBodyParser())
	.use(validateUser())
	.use(errorHandler());
