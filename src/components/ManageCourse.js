import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import * as courseActions from '../actions/courseActions';
import * as authorActions from '../actions/authorActions';
import courseStore from '../stores/courseStore';
import authorStore from '../stores/authorStore';
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

const ManageCourse = props => {
	const [course, setCourse] = useState(initialValues);
	const [courses, setCourses] = useState(courseStore.getCourses());
	const [errors, setErrors] = useState({});
	const [authors, setAuthors] = useState([]);

	useEffect(() => {
		const slug = props.match.params.slug;
		courseStore.addChangeListener(onChangeCourses);
		authorStore.addChangeListener(onChangeAuthors);

		if (authors.length === 0) {
			authorActions.loadAuthors();
		}

		if (courses.length === 0) {
			courseActions.loadCourses();
		} else if (slug) {
			setCourse(courseStore.getCourseBySlug(slug));
		}

		return () => {
			courseStore.removeChangeListener(onChangeCourses);
			authorStore.removeChangeListener(onChangeAuthors);
		};
	}, [authors.length, courses.length, props.match.params.slug]);

	const handleChange = ({ target }) => {
		setCourse({ ...course, [target.name]: target.value });
	};

	const handleSubmit = async event => {
		event.preventDefault();
		if (!formIsValid()) return;
		await courseActions.saveCourse(course);
		props.history.push('/courses');
		toast.success(`Course ${course.id ? 'Updated' : 'Saved'}`);
	};

	const handleBlur = ({ target }) => {
		const _errors = {};
		if (!target.value) _errors[target.name] = ucFirst(`${target.name} is required`);
		setErrors(_errors);
	};

	const onChangeCourses = () => {
		setCourses(courseStore.getCourses());
	};

	const onChangeAuthors = () => {
		setAuthors(authorStore.getAuthors());
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

export default ManageCourse;
