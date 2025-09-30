import './ShuiMessagePage.css';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import { useRef } from 'react';
import { validateMessage } from '../../utils/validators';
import Select from 'react-select';
import { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { postMessage } from '../../api/message';

const categories = [
	{ value: 'thoughts', label: 'Tankar' },
	{ value: 'ideas', label: 'Idéer' },
	{ value: 'questions', label: 'Frågor' },
	{ value: 'humor', label: 'Humor' },
];

function ShuiMessagePage() {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [errorFormMsg, setErrorFormMsg] = useState(null);
	const titleRef = useRef();
	const messageRef = useRef();
	const user = useAuthStore((state) => state.user);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorFormMsg(null);

		if (!selectedCategory)
			return setErrorFormMsg('Du måste välja en kategori');

		const validMessage = validateMessage(
			titleRef.current.value,
			messageRef.current.value
		);

		if (validMessage !== null) {
			setErrorFormMsg(validMessage);
		} else {
			const response = await postMessage({
				username: user.username,
				token: user.token,
				category: selectedCategory,
				title: titleRef.current.value,
				message: messageRef.current.value,
			});

			console.log(response);

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
		}
	};

	return (
		<div>
			<Header title={'NYTT SHUI'} />
			<main>
				<form className='form__shui-msg' onSubmit={handleSubmit}>
					<label className='form__label'>
						Kategori
						<Select
							options={categories}
							value={selectedCategory}
							onChange={setSelectedCategory}
							placeholder='Välj kategori...'
							styles={{
								control: (provided) => ({
									...provided,
									fontSize: '1rem',
									color: '#ffffff',
								}),
							}}
						/>
					</label>
					<label className='form__label'>
						Rubrik
						<input
							type='text'
							className='form__inputs'
							ref={titleRef}
						/>
					</label>

					<label className='form__label'>
						Skriv din tanke här
						<textarea
							type='text'
							ref={messageRef}
							rows='5'
							className='form__inputs'></textarea>{' '}
					</label>
					{errorFormMsg && (
						<p className='error_msg'>{errorFormMsg}</p>
					)}
					<Button className={'btn__form'} type={'submit'}>
						PUBLICERA
					</Button>
				</form>
			</main>
		</div>
	);
}

export default ShuiMessagePage;
