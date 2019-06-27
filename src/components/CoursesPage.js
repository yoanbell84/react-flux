//import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import { getCourses } from '../api/courseApi';
import CourseList from './CourseList';

/*class CoursesPage extends Component {
	state = {
		courses: [],
	};

	componentDidMount = async () => {
		const courses = await getCourses();
		this.setState({ courses });
	};

	render() {
		const { courses } = this.state;
		return (
			<div className='jumbotron'>
				<h1>Courses</h1>
				<CourseList courses={courses} />
			</div>
		);
	}
}*/

const CoursesPage = () => {
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await getCourses();
			setCourses(result);
		};
		fetchData();
	}, []);

	return (
		<div className='jumbotron'>
			<h1>Courses</h1>
			<CourseList courses={courses} />
		</div>
	);
};

export default CoursesPage;
