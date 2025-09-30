import { useAuthStore } from '../../stores/useAuthStore.js';
import './RegisterForm.css';
import { useRef, useState } from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { IoIosEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../../api/auth.js';
import { generateNb } from '../../utils/generateNb.js';
import { useMessageStore } from '../../stores/useMessageStore.js';
import { validateUser } from '../../utils/validators.js';
import Button from '../Button/Button.jsx';

function RegisterForm({ setLoginForm }) {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const emailRef = useRef();
	const navigate = useNavigate();
	const [showPsw, setShowPsw] = useState(false);
	const [avatarNb, setAvatarNb] = useState(1);
	const [gender, setGender] = useState('man');
	const [errorFormMsg, setErrorFormMsg] = useState(null);
	const showMsg = useMessageStore((state) => state.showMsg);
	const updateUserStorage = useAuthStore((state) => state.updateUserStorage);

	const registerUser = async (e) => {
		e.preventDefault();

		const validateUserForm = validateUser({
			username: usernameRef.current.value,
			password: passwordRef.current.value,
			email: emailRef.current.value,
		});

		setErrorFormMsg(null);
		if (validateUserForm) {
			setErrorFormMsg(validateUserForm);
		} else {
			setErrorFormMsg(null);
			const response = await registerApi({
				username: usernameRef.current.value,
				password: passwordRef.current.value,
				email: emailRef.current.value,
				avatar: `/avatars/avatar${avatarNb}`,
				gender: gender,
				role: 'user',
			});
			console.log(response);

			if (response.status === 201) {
				// Om det lyckas att registreras så läggs usern in i AuthStore
				updateUserStorage({
					username: response.data.username,
					token: response.data.token,
					avatar: response.data.avatar,
					email: response.data.email,
					gender: response.data.gender,
					role: response.data.role,
				});

				showMsg(`Registreringen lyckades! Lets Shui`, true, () =>
					navigate('/')
				);
			} else {
				setErrorFormMsg(response.data.message);
			}
		}
	};

	return (
		<>
			<form className='form' onSubmit={registerUser}>
				<h1 className='form__title'>Register</h1>
				<img
					className='form__avatar-img'
					src={`/avatars/avatar${avatarNb}.png`}
					alt='Image of avator'
				/>
				<div className='form__label-genders'>
					<label>
						Man
						<input
							className='form__input-gender'
							type='radio'
							name='gender'
							value='man'
							checked={gender === 'man'}
							onChange={(e) => {
								setAvatarNb(generateNb(1, 8));
								setGender('man');
							}}
						/>
					</label>
					<label>
						Kvinna
						<input
							className='form__input-gender'
							type='radio'
							name='gender'
							value='woman'
							checked={gender === 'woman'}
							onChange={(e) => {
								setAvatarNb(generateNb(9, 16));
								setGender('woman');
							}}
						/>
					</label>
					<Button
						className='btn__form-gender'
						type='button'
						onClick={() =>
							setAvatarNb(
								gender === 'man'
									? generateNb(1, 8)
									: generateNb(9, 16)
							)
						}>
						Byt bild
					</Button>
				</div>

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
				<label className='form__label'>
					Email:
					<input
						className='form__input'
						type='email'
						ref={emailRef}
						defaultValue={'adam@ek.se'}
						required
					/>
				</label>
				{errorFormMsg && <p className='error_msg'>{errorFormMsg}</p>}
				<Button className={'btn__form'} type={'submit'}>
					Registrera
				</Button>
				<p className='form__text'>
					Redan medlem?{' '}
					<span
						className='form__link'
						onClick={() => setLoginForm(true)}>
						Logga in här
					</span>
				</p>
			</form>
		</>
	);
}

export default RegisterForm;
