import { messageIdSchema } from '../models/messageIdSchema.mjs';

export const validateMsgId = () => ({
	before: (handler) => {
		const { msgId } = handler.event.pathParameters || {};

		const { error } = messageIdSchema.validate(msgId);
		if (error) throw new Error(error.details[0].message);
	},
});
