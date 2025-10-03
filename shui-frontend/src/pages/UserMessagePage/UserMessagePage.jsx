import './UserMessagePage.css';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ShuiMessages from '../../components/ShuiMessages/ShuiMessages';
import { fetchMessagesByUserId } from '../../hooks/useFetch.mjs';
import { useEffect } from 'react';
function UserMessagePage() {
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([]);
	const { username } = useParams();

	useEffect(() => {
		setLoading(true);

		const fetchMessagesByUser = async () => {
			const response = await fetchMessagesByUserId(username);
			console.log(response);

			if (response.status === 200) {
				setMessages(response.data);
			}
			setLoading(false);
		};

		fetchMessagesByUser();
	}, []);

	return (
		<div>
			<Header title={'MEDDELANDEN'}></Header>
			<main className='main__wrapper'>
				<h2 className='shui-user-msg__title'>{`Alla meddelande från ${username}`}</h2>
				{loading && <Loading text={'Hämtar meddelanden'} />}
				{!loading && messages.length > 0 && (
					<ShuiMessages
						messages={messages}
						user={{ username }}
						backButton={true}></ShuiMessages>
				)}
			</main>
		</div>
	);
}

export default UserMessagePage;
