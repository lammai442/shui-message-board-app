import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import {
	getUser,
	getUserByEmail,
	registerUser,
} from '../../../services/users.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { validateUser } from '../../../middlewares/validateUser.mjs';
import { generateToken } from '../../../utils/jwt.mjs';

export const handler = middy(async (event) => {
	const existingUser = await getUser(event.body.username);
	const existingEmail = await getUserByEmail(event.body.email);

	// Kontroll om användarnamn eller email redan finns i databasen
	if (
		existingUser?.attributes?.username === event.body.username ||
		existingEmail
	) {
		const message =
			existingUser?.attributes?.username === event.body.username
				? `Användarnamnet ${event.body.username} är redan upptaget`
				: `${event.body.email} är redan upptagen`;

		return sendResponses(404, { message });
	}

	const response = await registerUser(event.body);
	if (response) {
		const token = generateToken({
			username: event.body.username,
		});
		return sendResponses(201, {
			success: true,
			message: 'Användaren skapades',
			avatar: response.avatar,
			email: response.email,
			username: response.username,
			token: `Bearer ${token}`,
			gender: response.gender,
			role: response.role,
		});
	} else {
		return sendResponses(404, {
			message: 'Användaren kunde inte skapas',
		});
	}
})
	.use(httpJsonBodyParser())
	.use(validateUser())
	.use(errorHandler());
