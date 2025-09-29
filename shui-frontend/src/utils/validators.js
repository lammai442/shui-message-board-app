export const validateMessage = () => {};

export const validateUser = ({ username, password, email }) => {
	if (username) {
		const userPattern = /^[A-Za-z0-9]{5,}$/;
		if (!username || username.length < 5 || !userPattern.test(username)) {
			return 'Användarnamn måste vara minst 5 tecken och bara bokstäver och siffror.';
		}
	}

	if (password) {
		const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

		if (typeof password === 'object') {
			for (let key in password) {
				if (!passwordPattern.test(password[key])) {
					let inputField = '';
					if (key === 'oldPassword') inputField = 'Gamla lösenordet';
					if (key === 'newPassword') inputField = 'Nytt lösenord';
					if (key === 'confirmPassword')
						inputField = 'Bekräfta lösenord';

					return `Lösenordet för "${inputField}" är ogiltigt. Det måste vara minst 6 tecken och innehålla en stor bokstav, en liten bokstav och en siffra.`;
				}
			}

			if (password.oldPassword === password.newPassword) {
				return 'Nya lösenordet får inte vara samma som gamla lösenordet.';
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
	} else return 'Du måste ange en emailadress';

	return null;
};
