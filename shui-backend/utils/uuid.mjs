import { v4 as uuid } from 'uuid';

export const generateId = (amount) => {
	return uuid().substring(0, amount);
};
