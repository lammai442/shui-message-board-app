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
import { categories } from '../../data/data.js';

function HomePage() {
	const [messages, setMessages] = useState([]);
	const [selectedCategory, setSelectCategory] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const user = useAuthStore((state) => state.user);

	// Laddar meddelanden
	useEffect(() => {
		// Hoppar över om inget värde finns
		if (!selectedCategory) return;
		setLoading(true);

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
			const fetchCategoryMessages = async (selectedCategory) => {
				try {
					console.log(selectedCategory);

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
			fetchCategoryMessages(selectedCategory);
			setSortMsgByOldest(false);
		}
	}, [selectedCategory]);

	return (
		<div>
			<Header title={'HEM'} />
			<main className='main__wrapper'>
				{loading && <Loading text={'Laddar meddelanden'} />}
				<section className='messages__wrapper'>
					<section className='categories__box'>
						<h2
							className={`categories__title  ${
								selectedCategory && selectedCategory.length > 0
									? 'categories__title--none'
									: ''
							}`}>
							Utforska bland alla Shui
						</h2>
						<section
							className={`categories__btn-box ${
								selectedCategory && selectedCategory.length > 0
									? 'categories__btn-box--small'
									: ''
							}`}>
							{categories.map((c) => (
								<Button
									key={c.title}
									iconLeft={c.iconLeft}
									iconLeftClassName={c.category}
									className={`${c.className} ${
										selectedCategory === c.category
											? 'categories__btn--active'
											: ''
									} ${
										selectedCategory &&
										selectedCategory.length > 0
											? ' categories__btn--small'
											: ''
									}`}
									onClick={() => {
										setSelectCategory(c.category);
									}}>
									{c.title}
								</Button>
							))}
						</section>
					</section>
					{/* Renderar ut meddelanden utifrån vald kategori */}
					{selectedCategory && (
						<ShuiMessages
							backButton={false}
							messages={messages}
							user={user}
							loading={loading}
							setSortMsgByOldest={setSortMsgByOldest}
						/>
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
