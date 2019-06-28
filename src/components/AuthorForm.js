import React from 'react';
import TextInput from './common/TextInput';
import PropTypes from 'prop-types';

function AuthorForm(props) {
	const { author } = props;

	return (
		<form onSubmit={props.onSubmit}>
			<TextInput
				id='name'
				name='name'
				label='Author'
				placeholder='Enter Name'
				value={author.name}
				onChange={props.onChange}
				onBlur={props.onBlur}
				error={props.errors.name}
			/>

			<input type='submit' value='Save' className='btn btn-primary' />
		</form>
	);
}

AuthorForm.propTypes = {
	author: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
};

export default AuthorForm;
