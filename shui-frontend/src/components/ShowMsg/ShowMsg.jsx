import { useMessageStore } from '../../stores/useMessageStore';
import './ShowMsg.css';

function ShowMsg() {
	const { message, visible, success, hideMsg } = useMessageStore();

	if (!visible) return null;

	// setTimeout(() => {
	// 	hideMsg();
	// }, 3000);

	return (
		<div className='overlay' onClick={() => hideMsg()}>
			<p className={`popup ${success ? 'success' : 'error'}`}>
				{message}
			</p>
		</div>
	);
}

export default ShowMsg;
