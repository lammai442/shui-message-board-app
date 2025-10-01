import Joi from 'joi';

export const deleteParamsSchema = Joi.object({
	msgId: Joi.string().alphanum().length(5).required().messages({
		'string.length': 'msgId must be exactly 5 characters',
		'string.alphanum': 'msgId can only contain letters and numbers',
	}),
	userId: Joi.string().alphanum().required().messages({
		'string.alphanum': 'userId can only contain letters and numbers',
	}),
});
