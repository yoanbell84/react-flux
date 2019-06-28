import { EventEmitter } from 'events';
import dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

const ChangeEvent = 'change';
let _authors = [];
class AuthorStore extends EventEmitter {
	addChangeListener(callback) {
		this.on(ChangeEvent, callback);
	}
	removeChangeListener(callback) {
		this.removeListener(ChangeEvent, callback);
	}
	emitChange() {
		this.emit(ChangeEvent);
	}

	getAuthors() {
		return _authors;
	}

	getAuthorById(authorId) {
		return _authors.find(author => author.id === parseInt(authorId, 10));
	}
}

const store = new AuthorStore();

dispatcher.register(action => {
	switch (action.actionType) {
		case actionTypes.CREATE_AUTHOR:
			_authors = [..._authors, { ...action.author }];
			store.emitChange();
			break;
		case actionTypes.UPDATE_AUTHOR:
			const author = _authors.find(author => author.id === action.author.id);
			if (author) {
				const index = _authors.findIndex(author => author.id === action.author.id);
				_authors = [
					..._authors.slice(0, index),
					{ ...action.author },
					..._authors.slice(index + 1),
				];
				store.emitChange();
			}
			break;
		case actionTypes.LOAD_AUTHORS:
			_authors = action.authors;
			store.emitChange();
			break;
		case actionTypes.DELETE_AUTHOR:
			_authors = _authors.filter(author => author.id !== action.author.id);
			store.emitChange();
			break;
		default:
			break;
	}
});
export default store;
