import dispatcher from '../appDispatcher';
import * as courseApi from '../api/courseApi';
import actionTypes from './actionTypes';

export const saveCourse = async course => {
	const savedCourse = await courseApi.saveCourse(course);
	dispatcher.dispatch({
		actionType: actionTypes.CREATE_COURSE,
		course: savedCourse,
	});
};

export const loadCourses = async () => {
	const courses = await courseApi.getCourses();
	dispatcher.dispatch({
		actionType: actionTypes.LOAD_COURSES,
		courses: courses,
	});
};

export const deleteCourse = async course => {
	await courseApi.deleteCourse(course.id);
	dispatcher.dispatch({
		actionType: actionTypes.DELETE_COURSE,
		course: course,
	});
};
