import './AuthPage.css';
import shuiLogoWhite from '../../assets/logo/shui-logo-white.svg';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useState } from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import Loading from '../../components/Loading/Loading';

function LoginPage() {
	const [loginForm, setLoginForm] = useState(true);
	const [loading, setLoading] = useState(false);
	return (
		<main className='main__wrapper'>
			{loading && (
				<Loading
					text={
						loginForm ? 'Hämtar användare' : 'Registrerar användare'
					}
				/>
			)}
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
					<LoginForm
						setLoginForm={setLoginForm}
						setLoading={setLoading}
					/>
				) : (
					<RegisterForm
						setLoginForm={setLoginForm}
						setLoading={setLoading}
					/>
				)}
			</main>
		</main>
	);
}

export default LoginPage;
