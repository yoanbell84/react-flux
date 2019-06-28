import React from 'react';
import PropTypes from 'prop-types';

const TextInput = props => {
	let wrapperClass = 'form-group';
	if (props.error.length > 0) wrapperClass += ' has-error';
	return (
		<div className={wrapperClass}>
			<label htmlFor={props.id}>{props.label}</label>
			<div className='field'>
				<input
					id={props.id}
					type='text'
					name={props.name}
					className='form-control'
					value={props.value}
					placeholder={props.placeholder || props.name}
					onChange={props.onChange}
					onBlur={props.onBlur}
				/>
			</div>
			{props.error && <div className='alert alert-danger'>{props.error}</div>}
		</div>
	);
};

TextInput.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
};

TextInput.defaultProps = {
	error: '',
};

export default TextInput;
