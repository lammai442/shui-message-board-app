import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { getUser, registerUser } from '../../../services/users.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { validateUser } from '../../../middlewares/validateUser.mjs';
import { comparePasswords } from '../../../utils/bcrypt.mjs';

export const handler = middy(async (event) => {
	const response = await getUser(event.body.username);

	if (response) {
		if (
			await comparePasswords(
				event.body.password,
				response.attributes.password
			)
		) {
			return sendResponses(200, {
				message: 'User logged in successfully',
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
