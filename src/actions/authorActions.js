import dispatcher from '../appDispatcher';
import * as authorApi from '../api/authorApi';
import actionTypes from './actionTypes';

export const saveAuthor = async author => {
	const savedAuthor = await authorApi.saveAuthor(author);
	dispatcher.dispatch({
		actionType: author.id ? actionTypes.UPDATE_AUTHOR : actionTypes.CREATE_AUTHOR,
		author: savedAuthor,
	});
};

export const loadAuthors = async () => {
	const authors = await authorApi.getAuthors();
	dispatcher.dispatch({
		actionType: actionTypes.LOAD_AUTHORS,
		authors: authors,
	});
};

export const deleteAuthor = async author => {
	await authorApi.deleteAuthor(author.id);
	dispatcher.dispatch({
		actionType: actionTypes.DELETE_AUTHOR,
		author: author,
	});
};
