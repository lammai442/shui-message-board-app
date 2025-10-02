import { editMessageSchema } from '../models/editMessageSchema.mjs';

export const validateEditMessage = () => ({
	before: (handler) => {
		if (!handler.event.body) throw new Error('No body provided');

		const { error } = editMessageSchema.validate(handler.event.body);
		if (error) throw new Error(error.details[0].message);
	},
});
