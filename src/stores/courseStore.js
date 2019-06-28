import { EventEmitter } from 'events';
import dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

const ChangeEvent = 'change';
let _courses = [];
class CourseStore extends EventEmitter {
	addChangeListener(callback) {
		this.on(ChangeEvent, callback);
	}
	removeChangeListener(callback) {
		this.removeListener(ChangeEvent, callback);
	}
	emitChange() {
		this.emit(ChangeEvent);
	}

	getCourses() {
		return _courses;
	}

	getCourseBySlug(slug) {
		return _courses.find(course => course.slug === slug);
	}
}

const store = new CourseStore();

dispatcher.register(action => {
	switch (action.actionType) {
		case actionTypes.CREATE_COURSE:
			_courses = [..._courses, { ...action.course }];
			store.emitChange();
			break;
		case actionTypes.UPDATE_COURSE:
			const course = _courses.find(course => course.id === action.course.id);
			if (course) {
				const index = _courses.findIndex(course => course.id === action.course.id);
				_courses = [
					..._courses.slice(0, index),
					{ ...action.course },
					..._courses.slice(index + 1),
				];
				store.emitChange();
			}
			break;
		case actionTypes.LOAD_COURSES:
			_courses = action.courses;
			store.emitChange();
			break;
		case actionTypes.DELETE_COURSE:
			_courses = _courses.filter(course => course.id !== action.course.id);
			store.emitChange();
			break;
		default:
			break;
	}
});
export default store;
