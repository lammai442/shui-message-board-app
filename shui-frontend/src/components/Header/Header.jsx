import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Logo from '../LogoWhite/LogoWhite';
import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header({ title }) {
	const navigate = useNavigate();

	return (
		<header className='header'>
			<button
				className='header__logo-btn'
				onClick={() => {
					navigate('/');
				}}>
				<Logo style={'header__logo'} />
			</button>
			<h2 className='header__title'>{title}</h2>
			<HamburgerMenu />
		</header>
	);
}

export default Header;
