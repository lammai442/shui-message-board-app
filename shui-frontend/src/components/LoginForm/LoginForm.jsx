import { useAuthStore } from '../../stores/useAuthStore';
import './LoginForm.css';
import { useRef, useState } from 'react';
import { users } from '../../data/data.js';
import { IoEyeSharp } from 'react-icons/io5';
import { IoIosEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../api/auth.js';
function LoginForm() {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();
	const [showPsw, setShowPsw] = useState(false);
	const login = useAuthStore((state) => state.login);

	const loginUser = async (e) => {
		e.preventDefault();
		const result = await loginApi({
			username: usernameRef.current.value,
			password: passwordRef.current.value,
		});
		if (result) {
			// Om det lyckas att logga in så läggs usern in i AuthStore
			login({
				username: usernameRef.current.value,
				token: result.data.token,
			});
			// Om det lyckas att verifiera användaren så directas man till homePage
			navigate('/');
		}
	};
	return (
		<form className='form'>
			<h1 className='form__title'>Login</h1>
			<label className='form__label'>
				Användernamn:
				<input
					className='form__input'
					type='text'
					ref={usernameRef}
					defaultValue={'adam'}
				/>
			</label>
			<label className='form__label'>
				Password:
				<input
					className='form__input'
					type={showPsw ? 'text' : 'password'}
					ref={passwordRef}
					defaultValue={'1234'}
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
