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
import SortByTimeButton from '../SortByTimeButton/SortByTimeButton';
import { sortByOldest } from '../../utils/sortByOldest.js';
import { TbClockDown } from 'react-icons/tb';
import { TbClockUp } from 'react-icons/tb';
import BackButton from '../BackButton/BackButton.jsx';
function ShuiMessages({ messages, user, loading, backButton }) {
	const [currentMessages, setCurrentMessages] = useState(messages);
	const [deleteMsgPopup, setDeleteMsgPopup] = useState(false);
	const [deleteMsg, setDeleteMsg] = useState(null);
	const showMsg = useMessageStore((state) => state.showMsg);
	const [sortedMsgByOldest, setSortMsgByOldest] = useState(false);
	const token = useAuthStore((state) => state.user.token);
	const navigate = useNavigate();
	const userId = useAuthStore((state) => state.user.username);

	useEffect(() => {
		if (messages && messages.length > 0) {
			setCurrentMessages(messages);
		} else setCurrentMessages([]);
	}, [messages]);

	const handledeleteMsgPopup = async () => {
		const response = await deleteMessage(
			deleteMsg.msgId,
			deleteMsg.userId,
			token
		);
		if (response.data.message === 'Token is invalid') {
			return showMsg(
				`Du har varit inaktiv för länge och behöver logga in igen`,
				false,
				() => navigate('/auth')
			);
		}

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

	const handleSortByTime = () => {
		const sortByEldest = sortByOldest(
			[...currentMessages],
			sortedMsgByOldest
		);
		setCurrentMessages(sortByEldest);
		setSortMsgByOldest(!sortedMsgByOldest);
	};

	return (
		<>
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
				{/* Om det har laddas klart och det finns inga meddelanden */}
				{!loading && currentMessages.length === 0 && (
					<section className='shui-msg__empty-box'>
						<p className='shui-msg__empty-text'>
							{`Shuuuite... \nHär var det tomt! \nMen du kan bli först att skapa ett nytt Shui`}
						</p>
						<p className='shui-msg__empty-text'></p>
						<Button
							className={'shui-msg__empty-new-shui'}
							iconLeft={shuiLogoWhiteWrite}
							onClick={() => {
								if (user.username === 'Gäst') {
									showMsg(
										'Gäster har inte tillgång till detta.',
										false
									);
								} else navigate('/shuimessage');
							}}>
							Nytt Shui
						</Button>
					</section>
				)}
				{currentMessages.length > 0 && (
					<section
						className={`suit-messages__top-box ${
							!backButton && 'suit-messages__top-box--flex-end'
						}`}>
						{backButton && <BackButton></BackButton>}
						<SortByTimeButton
							className={`sort-time__btn`}
							icon={
								sortedMsgByOldest ? (
									<TbClockDown />
								) : (
									<TbClockUp />
								)
							}
							text={`${
								sortedMsgByOldest
									? 'Äldst först'
									: 'Senast först'
							}`}
							onClick={() => handleSortByTime()}
						/>
					</section>
				)}
				{currentMessages.map((message) => {
					// Kontroll om inloggad user är samma som den som skrev meddelandet
					const isOwnMessage = userId === message.PK.slice(5);
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
											className={'shui-msg__username-btn'}
											onClick={() =>
												navigate(
													`/user/${message.PK.slice(
														5
													)}/messages`
												)
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
									<Button
										className={'shui-msg__edit-btn'}
										onClick={() =>
											navigate('/edit-message', {
												state: {
													userId: user.username,
													msgId: message.SK,
													prevTitle: message.Title,
													prevText: message.Message,
													prevCategory:
														message.Category,
												},
											})
										}>
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
