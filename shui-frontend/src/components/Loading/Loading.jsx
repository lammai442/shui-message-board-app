import './Loading.css';

function Loading({ text }) {
	return (
		<div className='spinner-overlay'>
			<div className='spinner__box'>
				<div className='spinner'></div>
				<div className='spinner__text'>{text}</div>
			</div>
		</div>
	);
}

export default Loading;
