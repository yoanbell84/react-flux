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
		return _authors.find(author => author.id === authorId);
	}
}

const store = new AuthorStore();

dispatcher.register(action => {
	switch (action.actionType) {
		case actionTypes.CREATE_AUTHOR:
			_authors.push(action.author);
			store.emitChange();
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
