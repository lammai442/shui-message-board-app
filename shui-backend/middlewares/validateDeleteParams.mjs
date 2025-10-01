import { deleteParamsSchema } from '../models/deleteParamsSchema.mjs';
export const validateDeleteParams = () => ({
	before: (handler) => {
		const { msgId, userId } = handler.event.pathParameters || {};

		const { error } = deleteParamsSchema.validate({ msgId, userId });
		if (error) throw new Error(error.details[0].message);
	},
});
