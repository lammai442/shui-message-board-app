import './Welcome.css';
import { ReactTyped } from 'react-typed';
import ShuiLogoNoText from '../../assets/logo/SHUI-logo-no-text.png';
import Button from '../Button/Button';
function Welcome({ setShowWelcome }) {
	return (
		<div className='welcome__overlay'>
			<div className='welcome__title-box'>
				<h2 className='welcome__title'>SHUI - MESSAGE BOARD</h2>
				<p className='welcome__subtitle'>
					Dela vad du tycker, följ vad andra tänker
				</p>
			</div>
			<img
				className='welcome__logo'
				src={ShuiLogoNoText}
				alt='Image of logo'
			/>
			<div className='welcome__text-box'>
				<ReactTyped
					strings={[
						'Dela dina tankar!',
						'"Vad tror ni om min miljonidé? :)"',
						'"Kolla denna coola AI-grejen"',
					]}
					typeSpeed={100}
					backSpeed={30}
					loop
				/>
			</div>
			<Button
				className={'welcome__btn'}
				onClick={() => setShowWelcome(false)}>
				TILL INLOGGNING
			</Button>
		</div>
	);
}

export default Welcome;
