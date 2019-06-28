//import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import * as courseActions from '../actions/courseActions';
import * as authorActions from '../actions/authorActions';
import courseStore from '../stores/courseStore';
import authorStore from '../stores/authorStore';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CoursesPage = () => {
	const [courses, setCourses] = useState(courseStore.getCourses());
	const [authors, setAuthors] = useState(authorStore.getAuthors());

	useEffect(() => {
		courseStore.addChangeListener(onChangeCourses);
		authorStore.addChangeListener(onChangeAuthors);

		if (authors.length === 0) {
			const loadAuthors = async () => {
				return await authorActions.loadAuthors();
			};
			loadAuthors();
		}

		if (courses.length === 0) {
			const loadCourses = async () => {
				return await courseActions.loadCourses();
			};
			loadCourses();
		}

		return () => {
			courseStore.removeChangeListener(onChangeCourses);
			authorStore.removeChangeListener(onChangeAuthors);
		};
	}, [authors.length, courses.length]);

	const handleDeleteCourse = course => {
		courseActions.deleteCourse(course);
		toast.success('Course Deleted');
	};

	const onChangeCourses = () => {
		setCourses(courseStore.getCourses());
	};

	const onChangeAuthors = () => {
		setAuthors(authorStore.getAuthors());
	};

	return (
		<div className='jumbotron'>
			<h1>Courses</h1>
			<Link className='btn btn-primary' to='/course'>
				Add Course
			</Link>

			<CourseList courses={courses} authors={authors} onClick={handleDeleteCourse} />
		</div>
	);
};

export default CoursesPage;
