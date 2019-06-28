import React, { useState, useEffect } from 'react';
import AuthorForm from './AuthorForm';
import * as authorActions from '../actions/authorActions';
import { toast } from 'react-toastify';
import authorStore from '../stores/authorStore';

const ucFirst = string => {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const initialValues = {
	id: null,
	name: '',
};

const ManageAuthor = props => {
	const [errors, setErrors] = useState({});
	const [authors, setAuthors] = useState(authorStore.getAuthors());
	const [author, setAuthor] = useState(initialValues);

	useEffect(() => {
		const id = props.match.params.id;
		authorStore.addChangeListener(onChange);
		if (authors.length === 0) {
			authorActions.loadAuthors();
		} else if (id) {
			setAuthor(authorStore.getAuthorById(id));
		}
		return authorStore.removeChangeListener(onChange);
	}, [authors.length, props.match.params.id]);

	const onChange = () => {
		setAuthors(authorStore.getAuthors());
	};

	const handleChange = ({ target }) => {
		setAuthor({ ...author, [target.name]: target.value });
	};

	const handleSubmit = async event => {
		event.preventDefault();
		if (!formIsValid()) return;
		await authorActions.saveAuthor(author);
		props.history.push('/authors');
		toast.success(`Author ${author.id ? 'Updated' : 'Saved'}`);
	};

	const formIsValid = () => {
		const _errors = {};
		if (!author.name) _errors.name = 'Name is required';
		setErrors(_errors);
		return Object.keys(_errors).length === 0;
	};

	const handleBlur = ({ target }) => {
		const _errors = {};
		if (!target.value) _errors[target.name] = ucFirst(`${target.name} is required`);
		setErrors(_errors);
	};
	return (
		<>
			<h2>Manage Author</h2>
			<AuthorForm
				author={author}
				onChange={handleChange}
				onSubmit={handleSubmit}
				errors={errors}
				onBlur={handleBlur}
			/>
		</>
	);
};

export default ManageAuthor;
