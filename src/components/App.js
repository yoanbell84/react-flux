import React from 'react';
import AboutPage from './AboutPage';
import HomePage from './HomePage';
import Header from './common/Header';
import CoursesPage from './CoursesPage';
import AuthorsPage from './AuthorsPage';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import ManageCourse from './ManageCourse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManageAuthor from './ManageAuthor';

const App = () => {
	return (
		<div className='container-fluid'>
			<ToastContainer autoClose={3000} hideProgressBar />
			<Header />
			<Switch>
				<Route path='/' exact component={HomePage} />
				<Route path='/courses' component={CoursesPage} />
				<Route path='/author/:id' component={ManageAuthor} />
				<Route path='/authors' component={AuthorsPage} />
				<Route path='/author' component={ManageAuthor} />
				<Route path='/about' component={AboutPage} />
				<Route path='/course/:slug' component={ManageCourse} />
				<Route path='/course' component={ManageCourse} />
				<Redirect from='/about-page' to='/about' />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	);
};

export default App;
