import Joi from 'joi';

export const messageIdSchema = Joi.object({
	msgId: Joi.string().alphanum().length(5).required().messages({
		'string.length': 'msgId must be exactly 5 characters',
		'string.alphanum': 'msgId can only contain letters and numbers',
	}),
});
