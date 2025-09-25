import './HamburgerMenu.css';
import { useState } from 'react';
import Nav from '../Nav/Nav';
function HamburgerMenu() {
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<>
			<Nav openMenu={openMenu} setOpenMenu={setOpenMenu} />
			<button
				className='hamburger__btn'
				aria-label='Open nav menu button'
				onClick={() => setOpenMenu((prev) => !prev)}>
				<span
					className={
						openMenu
							? 'hamburger__lines hamburger__lines--active'
							: 'hamburger__lines'
					}></span>
			</button>
		</>
	);
}

export default HamburgerMenu;
