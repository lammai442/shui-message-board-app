import { IoEyeSharp } from 'react-icons/io5';
import { IoIosEyeOff } from 'react-icons/io';
import { useState } from 'react';

function FormField({ field }) {
	const [showPsw, setShowPsw] = useState(false);

	const inputType =
		field.type === 'password' && showPsw ? 'text' : field.type;

	return (
		<label className='form__label' key={field.label}>
			{field.label}:
			<input
				className='form__input'
				type={inputType}
				ref={field.ref}
				defaultValue={field.value}
				readOnly={field.readOnly}
				required={!field.readOnly}
			/>
			{field.showPassword && (
				<span
					className='form__showpassword'
					onClick={() => setShowPsw(!showPsw)}>
					{showPsw ? <IoEyeSharp /> : <IoIosEyeOff />}
				</span>
			)}
		</label>
	);
}

export default FormField;
