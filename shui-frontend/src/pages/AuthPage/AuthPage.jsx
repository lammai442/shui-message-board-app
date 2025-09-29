import './AuthPage.css';
import shuiLogoWhite from '../../assets/logo/shui-logo-white.svg';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useState } from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

function LoginPage() {
	const [loginForm, setLoginForm] = useState(true);
	return (
		<main>
			<section className='auth__top-hero'>
				<img
					src={shuiLogoWhite}
					alt='Image of logo'
					className='auth__hero-logo'
				/>
				<section className='auth__text'>
					<h1 className='auth__title'>Gör dina tankar synliga</h1>
					<h2 className='auth__subtitle'>
						Dela vad du tycker, följ vad andra tänker
					</h2>
				</section>
			</section>
			<main className='auth__main-wrapper'>
				{loginForm ? (
					<LoginForm setLoginForm={setLoginForm} />
				) : (
					<RegisterForm setLoginForm={setLoginForm} />
				)}
			</main>
		</main>
	);
}

export default LoginPage;
