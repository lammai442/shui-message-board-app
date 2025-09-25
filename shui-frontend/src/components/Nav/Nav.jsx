import './Nav.css';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

function Nav({ openMenu, setOpenMenu }) {
	const { avatar, username } = useAuthStore((state) => state.user);
	const navigate = useNavigate();
	const logout = useAuthStore((state) => state.logout);
	return (
		<nav
			className={`nav ${openMenu && 'nav__open'}`}
			onClick={(e) => setOpenMenu((prev) => !prev)}>
			<section className='nav__profile-box'>
				<img
					className='nav__profile-avatar'
					src={`${avatar}.png`}
					alt=''
				/>
				<h2>{username}</h2>
			</section>
			<ul>
				<li className='nav__links' onClick={() => navigate('/profile')}>
					Profilsidan
				</li>
			</ul>

			<button className='nav__logut-btn' onClick={() => logout()}>
				LOGGA UT
			</button>
		</nav>
	);
}

export default Nav;
