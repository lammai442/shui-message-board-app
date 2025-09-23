import './AuthPage.css';
import shuiLogoWhite from '../../assets/logo/shui-logo-white.svg';
import LoginForm from '../../components/LoginForm/LoginForm';

function LoginPage() {
	return (
		<div>
			<section className='auth__top-hero'>
				<img
					src={shuiLogoWhite}
					alt='Image of logo'
					className='auth__hero-logo'
				/>
			</section>
			<main className='auth__main-wrapper'>
				<LoginForm />
			</main>
		</div>
	);
}

export default LoginPage;
