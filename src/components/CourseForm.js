import React from 'react';
import TextInput from './common/TextInput';
import SelectInput from './common/SelectInput';
import PropTypes from 'prop-types';

function CourseForm(props) {
	const { course, authors } = props;
	const options = authors.map(({ id, name }) => ({ label: name, value: id }));
	return (
		<form onSubmit={props.onSubmit}>
			<TextInput
				id='title'
				name='title'
				label='Title'
				placeholder='Enter Title'
				value={course.title}
				onChange={props.onChange}
				onBlur={props.onBlur}
				error={props.errors.title}
			/>
			<SelectInput
				id='author'
				name='authorId'
				label='Author'
				placeholder='Select an author'
				value={course.authorId}
				options={options}
				onChange={props.onChange}
				error={props.errors.authorId}
				onBlur={props.onBlur}
			/>

			<TextInput
				id='category'
				name='category'
				label='Category'
				placeholder='Enter category'
				value={course.category}
				onChange={props.onChange}
				error={props.errors.category}
				onBlur={props.onBlur}
			/>

			<input type='submit' value='Save' className='btn btn-primary' />
		</form>
	);
}

CourseForm.propTypes = {
	course: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
};

export default CourseForm;
