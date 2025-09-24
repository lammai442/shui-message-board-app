import './ShowMsg.css';

function ShowMsg({ message, success }) {
	console.log(message, success);

	return (
		<div
			className={`show-msg__box ${
				success ? 'show-msg__success' : 'show-msg__false'
			}`}>
			<p>{message}</p>
		</div>
	);
}

export default ShowMsg;
