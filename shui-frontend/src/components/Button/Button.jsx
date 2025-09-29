import './Button.css';
function Button({ className, children, onClick, type }) {
	return (
		<button className={className} type={type} onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
