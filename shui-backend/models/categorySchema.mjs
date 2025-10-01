import Joi from 'joi';

export const categorySchema = Joi.object({
	category: Joi.string()
		.valid('tankar', 'ideer', 'humor', 'frågor')
		.required()
		.messages({
			'any.only':
				'Category must be either tankar, ideer, humor, or frågor.',
			'string.base': 'Category must be a string.',
			'any.required': 'Category is required.',
		}),
});
