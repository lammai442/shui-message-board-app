import './Nav.css';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { RiArrowRightSLine } from 'react-icons/ri';
import shuiLogoBlackBold from '../../assets/logo/shui-logo-black-bold.svg';

function Nav({ openMenu, setOpenMenu }) {
	const { avatar, username } = useAuthStore((state) => state.user);
	const navigate = useNavigate();
	const logout = useAuthStore((state) => state.logout);

	const navItems = [
		{
			title: 'Profilsidan',
			subtitle: 'Se och ändra din profil',
			Icon: CgProfile,
			route: '/profile',
		},
		{
			title: 'Meddelanden',
			subtitle: 'Överblick över dina meddelanden',
			// Icon: CgProfile,
			customIcon: shuiLogoBlackBold,
			route: '/messages',
		},
	];

	return (
		<>
			{openMenu && (
				<div
					className='nav__overlay'
					onClick={() => setOpenMenu((prev) => !prev)}></div>
			)}
			<nav className={`nav ${openMenu ? 'nav__open' : 'nav__closed'}`}>
				<section className='nav__profile-box'>
					<img
						className='nav__profile-avatar'
						src={`${avatar}.png`}
						alt=''
					/>
					<h2 className='nav__profile-title'>{username}</h2>
				</section>
				<ul>
					{navItems.map((navItem) => {
						return (
							<li
								key={navItem.title}
								className='nav__links'
								onClick={() => {
									setOpenMenu(false);
									setTimeout(() => {
										navigate(navItem.route);
									}, 500);
								}}>
								{navItem.Icon ? (
									<navItem.Icon className='nav__item-icon' />
								) : (
									<img
										src={navItem.customIcon}
										className='nav__item-icon'
									/>
								)}
								<section className='nav__item-content'>
									<p className='nav__item-title'>
										{navItem.title}
									</p>
									<p className='nav__item-subtitle'>
										{navItem.subtitle}
									</p>
								</section>
								<RiArrowRightSLine className='nav__item-icon' />
							</li>
						);
					})}
				</ul>

				<button className='nav__logut-btn' onClick={() => logout()}>
					LOGGA UT
				</button>
			</nav>
		</>
	);
}

export default Nav;
