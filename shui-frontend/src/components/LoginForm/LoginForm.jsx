import { useAuthStore } from '../../stores/useAuthStore';
import './LoginForm.css';
import { useRef, useState } from 'react';
import { users } from '../../data/data.js';
import { IoEyeSharp } from 'react-icons/io5';
import { IoIosEyeOff } from 'react-icons/io';
function LoginForm() {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const [showPsw, setShowPsw] = useState(false);
	const login = useAuthStore((state) => state.login);

	const loginUser = async (e) => {
		e.preventDefault();

		const userExist = users.some(
			(user) =>
				user.username === usernameRef.current.value &&
				user.password === passwordRef.current.value
		);
		console.log(userExist);
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
