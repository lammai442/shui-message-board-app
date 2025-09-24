import { useAuthStore } from '../../stores/useAuthStore';
import './LoginForm.css';
import { useRef, useState } from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { IoIosEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../api/auth.js';
import useTimedMessage from '../../hooks/useTimedMessage.jsx';
import ShowMsg from '../ShowMsg/ShowMsg.jsx';
function LoginForm() {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();
	const [showPsw, setShowPsw] = useState(false);
	const { visible, message, show } = useTimedMessage();
	const [showMsg, setShowMsg] = useState(false);
	const login = useAuthStore((state) => state.login);

	const loginUser = async (e) => {
		e.preventDefault();
		const result = await loginApi({
			username: usernameRef.current.value,
			password: passwordRef.current.value,
		});
		console.log(result);

		if (result) {
			// Om det lyckas att logga in så läggs usern in i AuthStore
			console.log(result);

			login({
				username: usernameRef.current.value,
				token: result.data.token,
			});

			show('Inloggning lyckades!', true);

			// setTimeout(() => navigate('/'), 3000);
		} else if (result === 'User not found') {
			console.log('här');

			show('Användarnamnet finns inte i databasen', false);
		}
	};

	return (
		<form className='form'>
			{visible && <ShowMsg message={message} success={false} />}
			<h1 className='form__title'>Login</h1>
			<label className='form__label'>
				Användernamn:
				<input
					className='form__input'
					type='text'
					ref={usernameRef}
					defaultValue={'adamek12'}
				/>
			</label>
			<label className='form__label'>
				Lösenord:
				<input
					className='form__input'
					type={showPsw ? 'text' : 'password'}
					ref={passwordRef}
					defaultValue={'Abc123'}
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
			<button className='form__button' onClick={loginUser}>
				Login
			</button>
			<p className='form__text'>
				Inget konto?{' '}
				<span className='form__link'>
					Klicka här för att registrera
				</span>
			</p>
		</form>
	);
}

export default LoginForm;
