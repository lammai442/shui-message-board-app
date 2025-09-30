import './ShuiMessage.css';
import { calculateTimeDiff } from '../../utils/calculateTimeDiff';

function ShuiMessage({ username, avatar, title, message, date, category }) {
	const diffTime = calculateTimeDiff(date);

	return (
		<section className={`shui-msg__box ${category}`}>
			<section className='shui-msg__top-box'>
				<img
					src={`${avatar}.png`}
					alt='Profile image'
					className='shui-msg__img'
				/>
				<section>
					<h2>{title}</h2>
					<p>{`${username} för ${diffTime}`}</p>
				</section>
			</section>
			<p>{message}</p>
		</section>
	);
}

export default ShuiMessage;
