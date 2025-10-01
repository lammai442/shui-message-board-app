import Joi from 'joi';

export const categorySchema = Joi.object({
	category: Joi.string()
		.valid('thoughts', 'ideas', 'humor', 'questions')
		.required()
		.messages({
			'any.only':
				'Category must be either thoughts, ideas, humor, or questions.',
			'string.base': 'Category must be a string.',
			'any.required': 'Category is required.',
		}),
});
