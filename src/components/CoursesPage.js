//import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import * as courseApi from '../api/courseApi';
import * as authorApi from '../api/authorApi';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';

const CoursesPage = () => {
	const [courses, setCourses] = useState([]);
	const [authors, setAuthors] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const _courses = await courseApi.getCourses();
			const _authors = await authorApi.getAuthors();
			setAuthors(_authors);
			setCourses(_courses);
		};
		fetchData();
	}, []);

	return (
		<div className='jumbotron'>
			<h1>Courses</h1>
			<Link className='btn btn-primary' to='/course'>
				Add Course
			</Link>
			<CourseList courses={courses} authors={authors} />
		</div>
	);
};

export default CoursesPage;
