import React from 'react';
import AboutPage from './AboutPage';
import HomePage from './HomePage';
import Header from './common/Header';
import CoursesPage from './CoursesPage';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import CrudCourse from './CrudCourse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<div className='container-fluid'>
			<ToastContainer autoClose={3000} hideProgressBar />
			<Header />
			<Switch>
				<Route path='/' exact component={HomePage} />
				<Route path='/courses' component={CoursesPage} />
				<Route path='/about' component={AboutPage} />
				<Route path='/course/:slug' component={CrudCourse} />
				<Route path='/course' component={CrudCourse} />
				<Redirect from='/about-page' to='/about' />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	);
};

export default App;
