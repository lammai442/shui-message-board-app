import Joi from 'joi';

export const loginSchema = Joi.object({
	username: Joi.string().alphanum().min(5).required(),
	password: Joi.string().required(),
});
