import { categorySchema } from '../models/categorySchema.mjs';
export const validateCategory = () => ({
	before: (handler) => {
		const { category } = handler.event.pathParameters || {};

		const { error } = categorySchema.validate({ category });
		if (error) throw new Error(error.details[0].message);
	},
});
