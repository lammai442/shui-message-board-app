import './ShuiMessages.css';
import { calculateTimeDiff } from '../../utils/calculateTimeDiff';
import Button from '../Button/Button';
import { useState, useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { deleteMessage } from '../../api/message';
import { useAuthStore } from '../../stores/useAuthStore';
import { useMessageStore } from '../../stores/useMessageStore';
import { useNavigate } from 'react-router-dom';
import shuiLogoWhiteWrite from '../../assets/logo/shui-logo-white-write.svg';

function ShuiMessages({ messages, user, loading }) {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [currentMessages, setCurrentMessages] = useState(messages);
	const [deleteMsgPopup, setDeleteMsgPopup] = useState(false);
	const [deleteMsg, setDeleteMsg] = useState(null);
	const showMsg = useMessageStore((state) => state.showMsg);
	const token = useAuthStore((state) => state.user.token);
	const navigate = useNavigate();

	useEffect(() => {
		if (messages && messages.length > 0) {
			setCurrentMessages(messages);
		} else setCurrentMessages([]);
	}, [messages]);

	useEffect(() => {
		if (selectedCategory === 'all') {
			selectedCategory(messages);
		} else {
			const filteredMessages = messages.filter(
				(m) => m.Category === selectedCategory
			);
			setCurrentMessages(filteredMessages);
		}
	}, [selectedCategory]);

	const handledeleteMsgPopup = async () => {
		const response = await deleteMessage(
			deleteMsg.msgId,
			deleteMsg.userId,
			token
		);

		if (response.status === 200) {
			setDeleteMsg(null);
			setDeleteMsgPopup(false);
			showMsg('Ditt meddelande är borttaget', true);

			const messagesAfterDelete = currentMessages.filter(
				(m) => m.SK !== `MESSAGE#${deleteMsg.msgId}`
			);
			setCurrentMessages(messagesAfterDelete);
		} else {
			showMsg('Ditt meddelande kunde inte tas bort', false);
			setDeleteMsg(null);
			setDeleteMsgPopup(false);
		}
	};

	return (
		<>
			{' '}
			{deleteMsgPopup && (
				<div className='overlay'>
					<section className='popup__box'>
						<p>Vill du ta bort meddelandet?</p>
						<section className='popup__btn-box'>
							<button
								className='popup__yes-btn'
								onClick={() => handledeleteMsgPopup(deleteMsg)}>
								Ja
							</button>
							<button
								className='popup__no-btn'
								onClick={() => setDeleteMsgPopup(false)}>
								Nej
							</button>
						</section>
					</section>
				</div>
			)}
			<section className='shui-msg__wrapper'>
				{!loading && currentMessages.length === 0 && (
					<section className='shui-msg__empty-box'>
						<p className='shui-msg__empty-text'>
							{`Här var det tomt! \n Men du kan bli först att skapa ett nytt Shui`}
						</p>
						<p className='shui-msg__empty-text'></p>
						<Button
							className={'shui-msg__empty-new-shui'}
							iconLeft={shuiLogoWhiteWrite}
							onClick={() => {
								navigate('/shuimessage');
							}}>
							Nytt Shui
						</Button>
					</section>
				)}
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
											className={
												'shui-msg__username-btn'
											}>
											{message.PK.slice(5)}
										</Button>
										{` för ${calculateTimeDiff(
											message.ModifiedAt
												? message.ModifiedAt
												: message.CreatedAt
										)}`}
									</span>
									<Button
										className={`shui-msg__category-btn ${message.Category}-btn`}>
										{`#${message.Category}`}
									</Button>
								</section>
							</section>
							<p className='shui-msg__text'>{message.Message}</p>
							{isOwnMessage && (
								<section className='shui-msg__edit-box'>
									<Button className={'shui-msg__edit-btn'}>
										Redigera
									</Button>
									<Button
										className={'shui-msg__remove-btn'}
										onClick={() => {
											setDeleteMsgPopup(true);
											setDeleteMsg({
												msgId: message.SK.slice(8),
												userId: message.PK.slice(5),
											});
										}}>
										<FaRegTrashAlt />
										Ta bort
									</Button>
								</section>
							)}
						</section>
					);
				})}
			</section>
		</>
	);
}

export default ShuiMessages;
