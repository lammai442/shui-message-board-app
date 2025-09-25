import Joi from 'joi';

export const userSchema = Joi.object({
	username: Joi.string().alphanum().min(5).required(),
	password: Joi.string()
		.alphanum()
		.min(6)
		.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)
		.messages({
			'string.pattern.base':
				'Password must contain at least one capital, one small letter and one number.',
		})
		.required(),
	email: Joi.string().email().required(),
	avatarUrl: Joi.string().required(),
	gender: Joi.string().valid('man', 'woman').required(),
});
