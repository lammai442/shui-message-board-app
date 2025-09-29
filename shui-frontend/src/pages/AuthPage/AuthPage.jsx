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
