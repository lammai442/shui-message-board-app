import Header from '../../components/Header/Header';
import { useAuthStore } from '../../stores/useAuthStore';
import './Profile.css';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessageStore } from '../../stores/useMessageStore';
import { generateNb } from '../../utils/generateNb';
import FormField from '../../components/FormField/FormField';
import { validateUser } from '../../utils/validateUser';
import { updateUserApi } from '../../api/auth';

function ProfilePage() {
	const { avatar, username, email, gender } = useAuthStore(
		(state) => state.user
	);
	const usernameRef = useRef();
	const oldPasswordRef = useRef();
	const newPasswordRef = useRef();
	const confirmPasswordRef = useRef();
	const emailRef = useRef();
	const [showPsw, setShowPsw] = useState(false);
	const [avatarNb, setAvatarNb] = useState(avatar.slice(-1));
	const [activeGender, setactiveGender] = useState(gender);
	const [errorFormMsg, setErrorFormMsg] = useState(null);
	const showMsg = useMessageStore((state) => state.showMsg);
	const login = useAuthStore((state) => state.login);
	const user = useAuthStore((state) => state.user);
	const navigate = useNavigate();

	const fields = [
		{
			label: 'Användarnamn',
			type: 'text',
			value: username,
			readOnly: true,
			ref: usernameRef,
		},
		{
			label: 'Gamla lösenordet',
			type: showPsw ? 'text' : 'password',
			value: 'Abc123',
			ref: oldPasswordRef,
			showPassword: true,
		},
		// { label: 'Nytt lösenord', type: 'password', ref: newPasswordRef },
		// {
		// 	label: 'Bekräfta lösenord',
		// 	type: 'password',
		// 	ref: confirmPasswordRef,
		// },
		{ label: 'Email', type: 'email', value: email, ref: emailRef },
	];

	const handleSubmit = async (e) => {
		e.preventDefault();

		setErrorFormMsg(null);
		const validateForm = validateUser({ email: emailRef.current.value });

		if (validateForm !== null) {
			setErrorFormMsg(validateForm);
		} else {
		}
		const response = await updateUserApi({
			username: usernameRef.current.value,
			password: oldPasswordRef.current.value,
			email: emailRef.current.value,
			avatarUrl: `/avatars/avatar${avatarNb}`,
			gender: activeGender,
		});
		console.log(response);

		if (response.data.message === 'Token is invalid') {
			showMsg(
				`Du har varit inaktiv för länge och behöver logga in igen`,
				false,
				() => navigate('/auth')
			);
		}
	};

	// showMsg(`Dina ändringar lyckades!`, true);
	return (
		<div>
			<Header title={'ÄNDRA PROFIL'} />
			<main>
				<div className='main__wrapper'>
					<form className='form' onSubmit={handleSubmit}>
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
							<button
								className='form__gender-btn'
								type='button'
								onClick={() =>
									setAvatarNb(
										activeGender === 'man'
											? generateNb(1, 8)
											: generateNb(9, 16)
									)
								}>
								Byt bild
							</button>
						</div>
						{fields.map((field) => (
							<FormField field={field} key={field.label} />
						))}
						{errorFormMsg && (
							<p className='error_msg'>{errorFormMsg}</p>
						)}
						<button className='form__btn' type='submit'>
							ÄNDRA
						</button>
					</form>
				</div>
			</main>
		</div>
	);
}

export default ProfilePage;
