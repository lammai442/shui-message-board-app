import shuiLogoWhite from '../../assets/logo/shui-logo-white.svg';
import './LogoWhite.css';

function Logo({ style }) {
	return <img src={shuiLogoWhite} alt='Image of logo' className={style} />;
}

export default Logo;
