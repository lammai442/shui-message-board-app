import './Button.css';
function Button({
	className,
	iconLeft,
	iconLeftClassName,
	iconRight,
	children,
	onClick,
	type,
}) {
	return (
		<button
			className={`btn__box ${className}`}
			type={type}
			onClick={onClick}>
			{iconLeft && (
				<img
					src={iconLeft}
					className={`btn__icon-left ${iconLeftClassName}`}
				/>
			)}
			{children}
			{iconRight && <img src={iconRight} className='btn__icon-right' />}
		</button>
	);
}
export default Button;
