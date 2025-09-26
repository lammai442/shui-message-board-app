export const validateUser = ({ username, password, email }) => {
	if (username) {
		if (!username || username.length < 5 || username.length > 10) {
			return 'Användarnamn måste vara mellan 5 och 10 tecken lång.';
		}
	}

	if (password) {
		const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
		if (!password || !passwordPattern.test(password)) {
			return 'Lösenord måste vara minst 6 tecken och innehålla en stor bokstav, en liten bokstav och en siffra.';
		}
	}

	if (email) {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email || !emailPattern.test(email)) {
			return 'Email måste vara giltig.';
		}
	}

	return null;
};
