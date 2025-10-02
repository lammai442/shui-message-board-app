import BackButton from '../../components/BackButton/BackButton';
import Header from '../../components/Header/Header';
import MessageForm from '../../components/MessageForm/MessageForm';
import { useState } from 'react';
import Loading from '../../components/Loading/Loading';
function EditMessagePage() {
	const [loading, setLoading] = useState(false);
	return (
		<div>
			<Header title={'REDIGERA SHUI'}></Header>
			<main className='main__wrapper'>
				{loading && <Loading text={'Publicerar...'} />}
				<BackButton />
				<MessageForm setLoading={setLoading} />
			</main>
		</div>
	);
}

export default EditMessagePage;
