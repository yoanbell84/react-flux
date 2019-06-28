import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = props => {
	let wrapperClass = 'form-group';
	if (props.error.length > 0) wrapperClass += ' has-error';
	return (
		<div className={wrapperClass}>
			<label htmlFor={props.id}>{props.label}</label>
			<div className='field'>
				<select
					id={props.id}
					name={props.name}
					value={props.value || ''}
					className='form-control'
					onChange={props.onChange}
					placeholder='Select an author'
					onBlur={props.onBlur}
				>
					<option value='' defaultValue disabled>
						{props.placeholder ? props.placeholder : 'Select...'}
					</option>

					{props.options.map(option => {
						return (
							<option value={option.value} key={option.value}>
								{option.label}
							</option>
						);
					})}
				</select>
				{props.error && <div className='alert alert-danger'>{props.error}</div>}
			</div>
		</div>
	);
};

SelectInput.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.any,
	error: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
		}),
	).isRequired,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
};

SelectInput.defaultProps = {
	error: '',
};

export default SelectInput;
