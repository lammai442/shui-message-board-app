import { useAuthStore } from '../../stores/useAuthStore';
import './LoginForm.css';
import { useRef, useState } from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { IoIosEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../api/auth.js';
import { useMessageStore } from '../../stores/useMessageStore.js';
function LoginForm({ setLoginForm }) {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();
	const [showPsw, setShowPsw] = useState(false);
	const showMsg = useMessageStore((state) => state.showMsg);
	const login = useAuthStore((state) => state.login);

	const loginUser = async (e) => {
		e.preventDefault();
		const response = await loginApi({
			username: usernameRef.current.value,
			password: passwordRef.current.value,
		});

		console.log(response);

		if (response.status === 200) {
			// Om det lyckas att logga in så läggs usern in i AuthStore

			login({
				username: usernameRef.current.value,
				token: response.data.token,
				avatar: response.data.avatar,
			});

			showMsg('Inloggning lyckades! Lets Shui!', true, () =>
				navigate('/')
			);
		} else {
			showMsg('Användarnamnet finns inte i databasen', false);
		}
	};

	return (
		<form className='form' onSubmit={loginUser}>
			<h1 className='form__title'>Login</h1>
			<label className='form__label'>
				Användernamn:
				<input
					className='form__input'
					type='text'
					ref={usernameRef}
					defaultValue={'adamek12'}
					required
				/>
			</label>
			<label className='form__label'>
				Lösenord:
				<input
					className='form__input'
					type={showPsw ? 'text' : 'password'}
					ref={passwordRef}
					defaultValue={'Abc123'}
					required
				/>{' '}
				{showPsw ? (
					<IoEyeSharp
						className='form__showpassword'
						onClick={() => setShowPsw(!showPsw)}
					/>
				) : (
					<IoIosEyeOff
						className='form__showpassword'
						onClick={() => setShowPsw(!showPsw)}
					/>
				)}
			</label>
			<button className='form__btn' type='submit'>
				LOGIN
			</button>
			<p className='form__text'>
				Inget konto?{' '}
				<span
					className='form__link'
					onClick={() => setLoginForm(false)}>
					Klicka här för att registrera
				</span>
			</p>
		</form>
	);
}

export default LoginForm;
