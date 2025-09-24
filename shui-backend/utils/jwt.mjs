import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
	const payload = user;
	const token = jwt.sign(payload, 'shuisecretpassword', {
		expiresIn: '1h',
	});

	return token;
};

export const verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, 'shuisecretpassword');
		return decoded;
	} catch (error) {
		console.log(error.message);
		return null;
	}
};
