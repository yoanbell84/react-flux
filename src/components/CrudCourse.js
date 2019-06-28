import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import * as courseApi from '../api/courseApi';
import * as authorApi from '../api/authorApi';
import { toast } from 'react-toastify';

const initialValues = {
	id: null,
	slug: '',
	title: '',
	authorId: null,
	category: '',
};

const ucFirst = string => {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const CrudCourse = props => {
	const [course, setCourse] = useState(initialValues);
	const [errors, setErrors] = useState({});
	const [authors, setAuthors] = useState([]);

	const handleChange = ({ target }) => {
		setCourse({ ...course, [target.name]: target.value });
	};

	const handleSubmit = async event => {
		event.preventDefault();
		if (!formIsValid()) return;
		let result = await courseApi.saveCourse(course);
		if (result) {
			props.history.push('/courses');
			toast.success('Course Saved');
		}
	};

	useEffect(() => {
		const slug = props.match.params.slug;
		if (slug) {
			const fetchData = async () => {
				const _course = await courseApi.getCourseBySlug(slug);
				setCourse(_course);
			};
			fetchData();
		}
		const fetchAuthors = async () => {
			const _authors = await authorApi.getAuthors();
			setAuthors(_authors);
		};
		fetchAuthors();
	}, [props.match.params.slug]);

	const handleBlur = ({ target }) => {
		const _errors = {};
		if (!target.value) _errors[target.name] = ucFirst(`${target.name} is required`);
		setErrors(_errors);
	};

	const formIsValid = () => {
		const _errors = {};
		if (!course.title) _errors.title = 'Title is required';
		if (!course.authorId) _errors.authorId = 'You must select an author';
		if (!course.category) _errors.category = 'Category is required';

		setErrors(_errors);
		return Object.keys(_errors).length === 0;
	};
	return (
		<>
			<h2>Manage Courses</h2>
			<CourseForm
				course={course}
				onChange={handleChange}
				onSubmit={handleSubmit}
				errors={errors}
				onBlur={handleBlur}
				authors={authors}
			/>
		</>
	);
};

export default CrudCourse;
