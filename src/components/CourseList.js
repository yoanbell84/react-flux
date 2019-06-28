import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CourseList = props => {
	const { courses, authors, onClick } = props;
	return (
		<table className='table responsive striped bordered hover'>
			<thead>
				<tr>
					<th>Title</th>
					<th>Author</th>
					<th>Category</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{courses.map(course => {
					let author =
						(authors &&
							authors.length > 0 &&
							authors.find(author => author.id === course.authorId).name) ||
						'';
					return (
						<tr key={course.id}>
							<td>
								<Link to={'/course/' + course.slug}>{course.title}</Link>
							</td>
							<td>{(author && author) || 'Unknown'}</td>
							<td>{course.category}</td>
							<td>
								<button className='btn btn-danger' onClick={() => onClick(course)}>
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

CourseList.propTypes = {
	courses: PropTypes.array.isRequired,
};

export default CourseList;
