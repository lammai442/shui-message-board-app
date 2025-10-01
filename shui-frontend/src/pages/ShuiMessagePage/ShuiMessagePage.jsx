import './ShuiMessagePage.css';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import { useRef } from 'react';
import { validateMessage } from '../../utils/validators';
import Select from 'react-select';
import { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { postMessage } from '../../api/message';
import { useMessageStore } from '../../stores/useMessageStore';
import Loading from '../../components/Loading/Loading';
import { categoriesValues } from '../../data/data.js';
import { useNavigate } from 'react-router-dom';
function ShuiMessagePage() {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');
	const [errorFormMsg, setErrorFormMsg] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const showMsg = useMessageStore((state) => state.showMsg);
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
			setLoading(true);
			const response = await postMessage(
				{
					username: user.username,
					avatar: user.avatar,
					category: selectedCategory.value,
					title: title,
					message: message,
				},
				user.token
			);
			setLoading(false);

			console.log(response);

			if (response.data.message === 'Token is invalid') {
				return showMsg(
					`Du har varit inaktiv för länge och behöver logga in igen`,
					false,
					() => navigate('/auth')
				);
			}
			if (response.status !== 201) {
				return setErrorFormMsg(response.data.message);
			}

			if (response.status === 201) {
				setTitle('');
				setMessage('');
				return showMsg('Ditt meddelande är publicerad', true);
			}
		}
	};

	return (
		<div>
			<Header title={'NYTT SHUI'} />
			<main className='main__wrapper'>
				{loading && <Loading text={'Publicerar...'} />}
				<form className='form__shui-msg' onSubmit={handleSubmit}>
					<label className='form__label'>
						Kategori
						<Select
							options={categoriesValues}
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
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</label>

					<label className='form__label'>
						Skriv din tanke här
						<textarea
							type='text'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							ref={messageRef}
							rows='5'
							className='form__inputs'></textarea>
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
