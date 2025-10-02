import { userIdSchema } from '../models/userIdSchema.mjs';
export const validateUserId = () => ({
	before: (handler) => {
		const { userId } = handler.event.pathParameters || {};

		const { error } = userIdSchema.validate({ userId });
		if (error) throw new Error(error.details[0].message);
	},
});
