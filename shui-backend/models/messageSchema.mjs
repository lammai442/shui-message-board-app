import Joi from 'joi';

export const messageSchema = Joi.object({
	username: Joi.string().alphanum().min(5).required(),
	category: Joi.string().required(),
	title: Joi.string().min(1).required(),
	message: Joi.string().min(1).required(),
});
