import './MessagePage.css';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ShuiMessages from '../../components/ShuiMessages/ShuiMessages';
import { useAuthStore } from '../../stores/useAuthStore';
import { useMessageStore } from '../../stores/useMessageStore';
import { fetchMessagesByUserId } from '../../hooks/useFetch.mjs';
import BackButton from '../../components/BackButton/BackButton';

function MessagePage() {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const showMsg = useMessageStore((state) => state.showMsg);
	const navigate = useNavigate();
	const user = useAuthStore((state) => state.user);

	// Laddar meddelanden
	useEffect(() => {
		setLoading(true);
		const loadMessages = async () => {
			if (!user.username) {
				showMsg(
					'Man måste vara inloggad för att se sina meddelanden',
					false
				);
				setLoading(false);
				return;
			}

			const response = await fetchMessagesByUserId(user.username);
			console.log(response);
			if ((response.success = true)) {
				setMessages(response.data);
			} else {
				console.log('fel i hämtning');
			}
			setLoading(false);
		};

		loadMessages();
	}, []);

	return (
		<div>
			<Header title={'MEDDELANDEN'} />
			<main className='main__wrapper'>
				<BackButton></BackButton>
				<ShuiMessages
					messages={messages}
					user={user}
					loading={loading}></ShuiMessages>
			</main>
		</div>
	);
}

export default MessagePage;
