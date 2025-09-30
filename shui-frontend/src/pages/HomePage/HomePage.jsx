import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import './HomePage.css';
import shuiLogoWhiteWrite from '../../assets/logo/shui-logo-white-write.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMessages } from '../../api/message';
import ShuiMessages from '../../components/ShuiMessages/ShuiMessages';
import Loading from '../../components/Loading/Loading';
function HomePage() {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		const fetchMessages = async () => {
			try {
				const messageData = await getMessages();
				setMessages(messageData.data.data);
				setLoading(false);
			} catch (error) {
				console.error('Kunde inte hämta meddelanden', error);
			}
		};
		fetchMessages();
	}, []);

	console.log(messages);

	return (
		<div>
			<Header title={'HEM'} />
			<main className='main__wrapper'>
				{loading && <Loading text={'Laddar meddelanden'} />}
				<section className='messages__wrapper'>
					{/* {messages.length > 0 &&
						messages.map((message) => {
							return (
								<ShuiMessage
									key={message.SK}
									username={message.PK.slice(5)}
									avatar={message.Avatar}
									title={message.Title}
									message={message.Message}
									date={message.GSI1SK}
									category={message.Category}></ShuiMessage>
							);
						})} */}
					<ShuiMessages messages={messages} />
				</section>
			</main>
			<Button
				className={'btn__shui-msg'}
				iconLeft={shuiLogoWhiteWrite}
				onClick={() => navigate('/shuimessage')}>
				Nytt Shui
			</Button>
		</div>
	);
}

export default HomePage;
