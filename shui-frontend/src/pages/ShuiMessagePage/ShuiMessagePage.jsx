import './ShuiMessagePage.css';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import FormField from '../../components/FormField/FormField';
import { useRef } from 'react';
import { validateMessage } from '../../utils/validators';

function ShuiMessagePage() {
	const titleRef = useRef();
	const messageRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();

		const validMessage = validateMessage(
			titleRef.current.value,
			messageRef.current.value
		);
	};
	return (
		<div>
			<Header title={'NYTT SHUI'} />
			<main>
				<form className='form__shui-msg' onSubmit={handleSubmit}>
					<label>
						Rubrik
						<input type='text' required ref={titleRef} />
					</label>
					<label>
						Shui-tanke
						<textarea
							type='text'
							ref={messageRef}
							rows='5'
							cols='30'
							required
							placeholder='Skriv ditt tanke här'></textarea>{' '}
					</label>
					<Button className={'btn__form'} type={'submit'}>
						PUBLICERA
					</Button>
				</form>
			</main>
		</div>
	);
}

export default ShuiMessagePage;
