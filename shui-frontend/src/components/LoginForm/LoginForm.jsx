import { useAuthStore } from '../../stores/useAuthStore';
import './LoginForm.css';
import { useRef, useState } from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { IoIosEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../api/auth.js';
import { useMessageStore } from '../../stores/useMessageStore.js';
import Button from '../Button/Button.jsx';
function LoginForm({ setLoginForm }) {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();
	const [showPsw, setShowPsw] = useState(false);
	const [errorFormMsg, setErrorFormMsg] = useState(null);
	const showMsg = useMessageStore((state) => state.showMsg);
	const updateUserStorage = useAuthStore((state) => state.updateUserStorage);

	const loginUser = async (e) => {
		e.preventDefault();
		setErrorFormMsg(null);
		const response = await loginApi({
			username: usernameRef.current.value,
			password: passwordRef.current.value,
		});

		if (response.status === 200) {
			// Om det lyckas att logga in så läggs usern in i AuthStore
			updateUserStorage({
				username: response.data.username,
				token: response.data.token,
				avatar: response.data.avatar,
				email: response.data.email,
				gender: response.data.gender,
				role: response.data.role,
			});

			showMsg('Inloggning lyckades! Lets Shui!', true, () =>
				navigate('/')
			);
		} else if (response.data.message === 'Wrong password')
			setErrorFormMsg('Fel lösenord');
		else {
			setErrorFormMsg('Användarnamnet finns inte i databasen');
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
			{errorFormMsg && <p className='error_msg'>{errorFormMsg}</p>}
			<Button className={'btn__form'} type={'submit'}>
				LOGGA IN
			</Button>
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
