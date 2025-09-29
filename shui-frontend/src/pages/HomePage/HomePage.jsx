import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import './HomePage.css';
import shuiLogoWhiteWrite from '../../assets/logo/shui-logo-white-write.svg';
import { useNavigate } from 'react-router-dom';

function HomePage() {
	const navigate = useNavigate();
	return (
		<div>
			<Header title={'HEM'} />
			<main></main>
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
