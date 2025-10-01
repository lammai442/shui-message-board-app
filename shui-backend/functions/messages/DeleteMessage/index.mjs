import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import {
	getUser,
	updateUser,
	getUserByEmail,
} from '../../../services/users.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { comparePasswords, hashPassword } from '../../../utils/bcrypt.mjs';
import { validateUser } from '../../../middlewares/validateUser.mjs';
import { verifyToken } from '../../../utils/jwt.mjs';

export const handler = middy(async (event) => {
	const authHeader =
		event.headers.Authorization || event.headers.authorization;
	const { username, password, email, gender, avatar } = event.body;

	if (!authHeader)
		return sendResponses(404, { message: 'Missing Authorization header' });

	const token = authHeader.slice(7);

	const validToken = verifyToken(token);

	if (!validToken) {
		return sendResponses(404, { message: 'Token is invalid' });
	}
	const messageId = event.pathParameters.msgId;
	const message = await getMessageById(messageId);

	if (message) {
		let validPassword = true;

		// Om användaren skickar med ett nytt lösenord
		if (password) {
			validPassword = await comparePasswords(
				password.oldPassword,
				user.password
			);
			// Här ersätts det gamla password med nya hashade password
			event.body.password = await hashPassword(password.newPassword);
		} else event.body.password = user.password;

		if (validPassword) {
			const emailUser = await getUserByEmail(email);

			// Kontrollera e-mailen
			if (emailUser && emailUser.attributes.username !== username) {
				// Om e-mailen finns och tillhör någon annan användare

				return sendResponses(400, {
					message: `${email} är redan upptagen av en annan användare`,
				});
			}
			const updatedUser = await updateUser(event.body);

			return sendResponses(200, {
				success: true,
				message: 'User updated',
				avatar: updatedUser.avatar,
				email: updatedUser.email,
				username: updatedUser.username,
				gender: updatedUser.gender,
				role: updatedUser.role,
			});
		} else {
			return sendResponses(400, { message: 'Fel lösenord' });
		}
	} else {
		return sendResponses(404, {
			message: 'Användaren hittas inte i databasen',
		});
	}
})
	.use(httpJsonBodyParser())
	.use(val)
	.use(errorHandler());
