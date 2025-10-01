import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import './HomePage.css';
import shuiLogoWhiteWrite from '../../assets/logo/shui-logo-white-write.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMessages, getMessagesByCategories } from '../../api/message';
import ShuiMessages from '../../components/ShuiMessages/ShuiMessages';
import Loading from '../../components/Loading/Loading';
import { useAuthStore } from '../../stores/useAuthStore';
function HomePage() {
	const [messages, setMessages] = useState([]);
	const [selectedCategory, setSelectCategory] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const user = useAuthStore((state) => state.user);

	const categories = [
		{
			category: 'all',
			title: 'ALLA',
			className: 'category-btn all-btn',
		},
		{
			category: 'thoughts',
			title: 'TANKAR',
			className: 'category-btn thoughts-btn',
		},
		{
			category: 'humor',
			title: 'HUMOR',
			className: 'category-btn humor-btn',
		},
		{
			category: 'ideas',
			title: 'IDÉER',
			className: 'category-btn ideas-btn',
		},
		{
			category: 'questions',
			title: 'FRÅGOR',
			className: 'category-btn questions-btn',
		},
	];

	// Laddar meddelanden
	useEffect(() => {
		// Hoppar över om inget värde finns
		if (!selectedCategory) return;
		setLoading(true);
		console.log(selectedCategory);

		if (selectedCategory === 'all') {
			const fetchAllMessages = async () => {
				try {
					const messageData = await getMessages();
					setMessages(messageData.data.data);
					setLoading(false);
				} catch (error) {
					console.error('Kunde inte hämta meddelanden', error);
				}
			};
			fetchAllMessages();
		} else {
			console.log('här');

			const fetchCategoryMessages = async (selectedCategory) => {
				try {
					const messageData = await getMessagesByCategories(
						selectedCategory
					);
					setMessages(messageData.data.data);
					setLoading(false);
				} catch (error) {
					console.error(
						`Kunde inte hämta meddelanden för ${selectedCategory}`,
						error
					);
				}
			};
			fetchCategoryMessages();
		}
	}, [selectedCategory]);

	return (
		<div>
			<Header title={'HEM'} />
			<main className='main__wrapper'>
				{loading && <Loading text={'Laddar meddelanden'} />}
				<section className='messages__wrapper'>
					<section className='categories__box'>
						<h2 className='categories_title'>
							Välj en kategori och hitta nya tankar
						</h2>
						<section className='categories__btn-box'>
							{categories.map((c) => (
								<Button
									key={c.title}
									className={c.className}
									onClick={() =>
										setSelectCategory(c.category)
									}>
									{c.title}
								</Button>
							))}
						</section>
					</section>

					{selectedCategory && messages.length > 0 && (
						<ShuiMessages messages={messages} user={user} />
					)}
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
