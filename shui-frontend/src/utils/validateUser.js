export const validateUser = ({ username, password, email }) => {
	if (username) {
		if (!username || username.length < 5 || username.length > 10) {
			return 'Användarnamn måste vara mellan 5 och 10 tecken lång.';
		}
	}

	if (password) {
		const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

		if (typeof password === 'object') {
			for (let key in password) {
				if (!passwordPattern.test(password[key])) {
					console.log(key);
					let inputField = '';
					if (key === 'oldPassword') inputField = 'Gamla lösenordet';
					if (key === 'newPassword') inputField = 'Nytt lösenord';
					if (key === 'confirmPassword')
						inputField = 'Bekräfta lösenord';

					return `Lösenordet för "${inputField}" är ogiltigt. Det måste vara minst 6 tecken och innehålla en stor bokstav, en liten bokstav och en siffra.`;
					console.log('här');
				}
			}

			if (password.newPassword !== password.confirmPassword) {
				return 'Nytt och bekräfta lösenord stämmer inte med varandra';
			}
		} else if (!passwordPattern.test(password)) {
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
