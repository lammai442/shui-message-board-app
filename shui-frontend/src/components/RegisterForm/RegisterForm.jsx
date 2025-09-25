import { useAuthStore } from '../../stores/useAuthStore.js';
import './RegisterForm.css';
import { useRef, useState } from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { IoIosEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../../api/auth.js';
import ShowMsg from '../ShowMsg/ShowMsg.jsx';
import { generateNb } from '../../utils/generateNb.js';
import { useMessageStore } from '../../stores/useMessageStore.js';
function RegisterForm({ setLoginForm }) {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const emailRef = useRef();
	const navigate = useNavigate();
	const [showPsw, setShowPsw] = useState(false);
	const showMsg = useMessageStore((state) => state.showMsg);
	const [avatarNb, setAvatarNb] = useState(1);
	const [gender, setGender] = useState('man');
	const login = useAuthStore((state) => state.login);

	const registerUser = async (e) => {
		e.preventDefault();
		const response = await registerApi({
			username: usernameRef.current.value,
			password: passwordRef.current.value,
			email: emailRef.current.value,
			avatarUrl: `https://avatar.iran.liara.run/public/${avatarNb}`,
			gender: gender,
		});

		if (response.status === 201) {
			// Om det lyckas att registreras så läggs usern in i AuthStore
			login({
				username: usernameRef.current.value,
				token: response.data.token,
			});

			showMsg(
				`Registreringen lyckades! Välkommen till gemenskapen ${usernameRef.current.value}`,
				true,
				() => navigate('/')
			);
		} else {
			showMsg('Användarnamnet finns inte i databasen', false);
		}
	};

	return (
		<>
			<ShowMsg message={'hej'} success={true} />
			<form className='form' onSubmit={registerUser}>
				<h1 className='form__title'>Register</h1>
				<img
					className='form__avatar-img'
					src={`https://avatar.iran.liara.run/public/${avatarNb}`}
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
								setAvatarNb(generateNb(0, 50));
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
								setAvatarNb(generateNb(50, 100));
								setGender('woman');
							}}
						/>
					</label>
					<button
						type='button'
						onClick={() =>
							setAvatarNb(
								gender === 'man'
									? generateNb(0, 50)
									: generateNb(50, 100)
							)
						}>
						Byt bild
					</button>
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
				<button className='form__button' type='submit'>
					Registrera
				</button>
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
