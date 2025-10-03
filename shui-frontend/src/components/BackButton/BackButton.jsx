import { IoReturnUpBackOutline } from 'react-icons/io5';
import './BackButton.css';
import { useNavigate } from 'react-router-dom';

function BackButton() {
	const navigate = useNavigate();

	return (
		<button className='back-btn' onClick={() => navigate(-1)}>
			<IoReturnUpBackOutline />
		</button>
	);
}

export default BackButton;
