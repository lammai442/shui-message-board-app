import Header from '../../components/Header/Header';
import { useAuthStore } from '../../stores/useAuthStore';
import './Profile.css';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessageStore } from '../../stores/useMessageStore';
import { generateNb } from '../../utils/generateNb';
import FormField from '../../components/FormField/FormField';
import { validateUser } from '../../utils/validators';
import { updateUserApi } from '../../api/auth';
import Button from '../../components/Button/Button';

function ProfilePage() {
	const { avatar, username, email, gender } = useAuthStore(
		(state) => state.user
	);
	const usernameRef = useRef();
	const oldPasswordRef = useRef();
	const newPasswordRef = useRef();
	const confirmPasswordRef = useRef();
	const emailRef = useRef();
	const navigate = useNavigate();
	const [avatarNb, setAvatarNb] = useState(avatar.slice(15));
	const [activeGender, setactiveGender] = useState(gender);
	const [errorFormMsg, setErrorFormMsg] = useState(null);
	const showMsg = useMessageStore((state) => state.showMsg);
	const updateUserStorage = useAuthStore((state) => state.updateUserStorage);
	const user = useAuthStore((state) => state.user);

	const handleFocus = () => {
		setErrorFormMsg('Användarnamn går inte att ändra');
		setTimeout(() => {
			setErrorFormMsg(null);
		}, 3000);
	};
	const fields = [
		{
			label: 'Användarnamn',
			type: 'text',
			value: username,
			readOnly: true,
			ref: usernameRef,
			onFocus: handleFocus,
		},
		{
			label: 'Gamla lösenordet',
			type: 'password',
			ref: oldPasswordRef,
			value: 'Abc123',
			showPassword: true,
			required: false,
		},
		{
			label: 'Nytt lösenord',
			type: 'text',
			ref: newPasswordRef,
			value: 'Mamma12',
			required: false,
		},
		{
			label: 'Bekräfta lösenord',
			type: 'text',
			ref: confirmPasswordRef,
			value: 'Mamma12',
			required: false,
		},
		{
			label: 'Email',
			type: 'email',
			value: email,
			ref: emailRef,
			required: false,
		},
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		let password = {
			oldPassword: oldPasswordRef.current.value,
			newPassword: newPasswordRef.current.value,
			confirmPassword: confirmPasswordRef.current.value,
		};
		// Om användaren inte fyller i något nytt lösenord
		if (
			password.oldPassword === '' &&
			password.newPassword === '' &&
			password.confirmPassword === ''
		) {
			password = null;
		}

		setErrorFormMsg(null);
		const validateForm = validateUser({
			email: emailRef.current.value,
			password: password,
		});

		if (validateForm !== null) {
			setErrorFormMsg(validateForm);
		} else {
			// Om användaren har fyllt i inputs för nytt password annars blir den null
			if (password)
				password = {
					oldPassword: oldPasswordRef.current.value,
					newPassword: newPasswordRef.current.value,
				};

			const response = await updateUserApi({
				username: usernameRef.current.value,
				password: password,
				email: emailRef.current.value,
				avatar: `/avatars/avatar${avatarNb}`,
				gender: activeGender,
				role: user.role,
			});

			if (response.status !== 200) {
				return setErrorFormMsg(response.data.message);
			}

			if (response.data.message === 'Token is invalid') {
				return showMsg(
					`Du har varit inaktiv för länge och behöver logga in igen`,
					false,
					() => navigate('/auth')
				);
			}
			if (response.status === 200) {
				updateUserStorage({
					username: response.data.username,
					token: user.token,
					avatar: response.data.avatar,
					email: response.data.email,
					gender: response.data.gender,
					role: response.data.role,
				});
				oldPasswordRef.current.value = '';
				newPasswordRef.current.value = '';
				confirmPasswordRef.current.value = '';
				showMsg('Dina ändringar är sparade', true);
			}
		}
	};

	return (
		<div>
			<Header title={'ÄNDRA PROFIL'} />
			<main className='main__wrapper'>
				<form className='form' onSubmit={handleSubmit}>
					<img
						className='form__avatar-img'
						src={`/avatars/avatar${avatarNb}.png`}
						alt='Image of avator'
					/>
					<section className='form__label-genders'>
						<label>
							Man
							<input
								className='form__input-gender'
								type='radio'
								name='gender'
								value='man'
								checked={activeGender === 'man'}
								onChange={(e) => {
									setAvatarNb(generateNb(1, 8));
									setactiveGender('man');
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
								checked={activeGender === 'woman'}
								onChange={(e) => {
									setAvatarNb(generateNb(9, 16));
									setactiveGender('woman');
								}}
							/>
						</label>
						<Button
							className='btn__form-gender'
							type='button'
							onClick={() =>
								setAvatarNb(
									activeGender === 'man'
										? generateNb(1, 8)
										: generateNb(9, 16)
								)
							}>
							Byt bild
						</Button>
					</section>
					{fields.map((field) => (
						<FormField field={field} key={field.label} />
					))}
					{errorFormMsg && (
						<p className='error_msg'>{errorFormMsg}</p>
					)}
					<Button className='btn__form' type='submit'>
						SPARA
					</Button>
				</form>
			</main>
		</div>
	);
}

export default ProfilePage;
