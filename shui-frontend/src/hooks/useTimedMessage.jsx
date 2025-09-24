import { useState } from 'react';

function useTimedMessage() {
	const [visible, setVisible] = useState(false);
	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState(null);

	const show = (text, success) => {
		setMessage(text);
		setVisible(true);
		setSuccess(success);
		setTimeout(() => {
			setVisible(false);
			setMessage('');
			setSuccess(null);
		}, 3000);
	};

	return { visible, message, success, show };
}

export default useTimedMessage;
