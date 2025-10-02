import Joi from 'joi';

export const userIdSchema = Joi.object({
	userId: Joi.string().alphanum().required().messages({
		'string.alphanum': 'userId can only contain letters and numbers',
	}),
});
