import './ShuiMessages.css';
import { calculateTimeDiff } from '../../utils/calculateTimeDiff';

function ShuiMessages({ messages }) {
	if (messages.length < 1) {
		return <p>Inga meddelanden</p>;
	}

	return (
		<section className='shui-msg__wrapper'>
			{messages.map((message) => {
				return (
					<section className={`shui-msg__box ${message.Category}`}>
						<section className='shui-msg__top-box'>
							<img
								src={`${message.Avatar}.png`}
								alt='Profile image'
								className='shui-msg__img'
							/>
							<section>
								<h2>{message.Title}</h2>
								<p>{`${message.PK.slice(
									5
								)} för ${calculateTimeDiff(
									message.ModifiedAt
										? message.ModifiedAt
										: message.CreatedAt
								)}`}</p>
							</section>
						</section>
						<p>{message.Message}</p>
					</section>
				);
			})}
		</section>
	);
}

export default ShuiMessages;
