import './ShuiMessages.css';
import { calculateTimeDiff } from '../../utils/calculateTimeDiff';
import Button from '../Button/Button';
import Select from 'react-select';
import { useState, useEffect, use } from 'react';

const filter = [
	{ value: 'thoughts', label: 'Tankar' },
	{ value: 'ideas', label: 'Idéer' },
	{ value: 'questions', label: 'Frågor' },
	{ value: 'humor', label: 'Humor' },
	{ value: 'all', label: 'Alla' },
];

function ShuiMessages({ messages, user }) {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [currentMessages, setCurrentMessages] = useState(messages);
	const [loading, setLoading] = useState(null);

	useEffect(() => {
		if (messages && messages.length > 0) {
			setCurrentMessages(messages);
		}
	}, [messages]);

	useEffect(() => {
		if (selectedCategory?.value === 'all') {
			selectedCategory(messages);
		} else {
			const filteredMessages = messages.filter(
				(m) => m.Category === selectedCategory.value
			);
			setCurrentMessages(filteredMessages);
		}
	}, [selectedCategory]);

	return (
		<section className='shui-msg__wrapper'>
			<label className='form__label'>
				Kategori
				<Select
					options={filter}
					value={selectedCategory}
					onChange={setSelectedCategory}
					placeholder='Välj kategori...'
					styles={{
						control: (provided) => ({
							...provided,
							fontSize: '1rem',
						}),
					}}
				/>
			</label>
			{currentMessages.map((message) => {
				// Kontroll om inloggad user är samma som den som skrev meddelandet
				const isOwnMessage = user.username === message.PK.slice(5);

				return (
					<section
						className={`shui-msg__box ${message.Category}`}
						key={message.CreatedAt}>
						<section className='shui-msg__top-box'>
							<img
								src={`${message.Avatar}.png`}
								alt='Profile image'
								className='shui-msg__img'
							/>
							<section>
								<h3 className='shui-msg__title'>
									{message.Title}
								</h3>
								<span>
									<Button
										className={'shui-msg__username-btn'}>
										{message.PK.slice(5)}
									</Button>
									{` för ${calculateTimeDiff(
										message.ModifiedAt
											? message.ModifiedAt
											: message.CreatedAt
									)}`}
								</span>
								<Button
									className={'shui-msg__category-btn'}
									onClick={() =>
										setSelectedCategory({
											value: message.Category,
										})
									}>
									{`#${message.Category}`}
								</Button>
							</section>
						</section>
						<p className='shui-msg__text'>{message.Message}</p>
						{isOwnMessage && (
							<Button className={'shui-msg__edit-btn'}>
								Redigera
							</Button>
						)}
					</section>
				);
			})}
		</section>
	);
}

export default ShuiMessages;
