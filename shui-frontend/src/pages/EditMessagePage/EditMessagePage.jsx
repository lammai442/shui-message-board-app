import Header from '../../components/Header/Header';
import MessageForm from '../../components/MessageForm/MessageForm';

function EditMessagePage() {
	return (
		<div>
			<Header title={'REDIGERA SHUI'}></Header>
			<main className='main__wrapper'>
				<MessageForm />
			</main>
		</div>
	);
}

export default EditMessagePage;
