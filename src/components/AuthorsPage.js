import React, { useState, useEffect } from 'react';
import authorStore from '../stores/authorStore';
import * as authorActions from '../actions/authorActions';
import { toast } from 'react-toastify';
import AuthorList from './AuthorList';
import { Link } from 'react-router-dom';

const AuthorsPage = props => {
	const [authors, setAuthors] = useState(authorStore.getAuthors());

	useEffect(() => {
		authorStore.addChangeListener(onChange);
		if (authors.length === 0) {
			const loadAuthors = async () => {
				return await authorActions.loadAuthors();
			};
			loadAuthors();
		}
		return () => {
			authorStore.removeChangeListener(onChange);
		};
	}, [authors.length]);

	const onChange = () => {
		setAuthors(authorStore.getAuthors());
	};

	const handleDelete = author => {
		authorActions.deleteAuthor(author);
		toast.success('Author Deleted');
	};

	return (
		<div className='jumbotron'>
			<h1>Authors</h1>
			<Link className='btn btn-primary' to='/author'>
				Add Author
			</Link>
			<AuthorList authors={authors} onClick={handleDelete} />
		</div>
	);
};

export default AuthorsPage;
