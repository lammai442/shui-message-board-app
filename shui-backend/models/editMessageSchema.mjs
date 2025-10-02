import Joi from 'joi';

export const editMessageSchema = Joi.object({
	userId: Joi.string().required(),
	category: Joi.string().required(),
	title: Joi.string().min(1).max(50).required(),
	message: Joi.string().min(1).required(),
	msgId: Joi.string()
		.pattern(/^MESSAGE#[A-Za-z0-9]{5}$/)
		.required(),
});
