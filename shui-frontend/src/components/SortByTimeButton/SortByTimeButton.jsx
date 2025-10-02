import React from 'react';
import Button from '../Button/Button';

function SortByTimeButton({ className, text, icon, onClick }) {
	return (
		<Button onClick={onClick} className={className}>
			{icon}
			{text}
		</Button>
	);
}

export default SortByTimeButton;
