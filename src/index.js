import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';

const app = document.getElementById('root');
ReactDOM.render(
	<Router>
		<App />
	</Router>,
	app,
);
