import Joi from 'joi';

const passwordRule = Joi.string()
	.alphanum()
	.min(6)
	.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)
	.messages({
		'string.pattern.base':
			'Password must contain at least one capital, one small letter and one number.',
	});
export const userSchema = Joi.object({
	username: Joi.string().alphanum().min(5).required(),
	password: Joi.alternatives()
		.try(
			// Validerar om det endast är en sträng som skickas med
			passwordRule,
			// Validerar om det är ett objekt som skickas med
			Joi.object({
				oldPassword: passwordRule.required(),
				newPassword: passwordRule.required(),
			})
		)
		.allow(null),
	email: Joi.string().email().required(),
	avatar: Joi.string().required(),
	gender: Joi.string().valid('man', 'woman').required(),
});
