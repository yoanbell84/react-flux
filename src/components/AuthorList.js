import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthorList = props => {
	const { authors, onClick } = props;
	return (
		<table className='table responsive striped bordered hover'>
			<thead>
				<tr>
					<th>Id</th>
					<th>Author</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{authors.map(author => {
					return (
						<tr key={author.id}>
							<td>{author.id}</td>
							<td>
								<Link to={'/author/' + author.id}>{author.name}</Link>
							</td>
							<td>
								<button className='btn btn-outline-danger' onClick={() => onClick(author)}>
									Delete
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

AuthorList.propTypes = {
	authors: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default AuthorList;
