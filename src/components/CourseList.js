import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CourseList = props => {
	const { courses, authors } = props;
	return (
		<table className='table responsive striped bordered hover'>
			<thead>
				<tr>
					<th>Title</th>
					<th>Author</th>
					<th>Category</th>
				</tr>
			</thead>
			<tbody>
				{courses.map(course => {
					let author = authors.find(author => author.id === course.authorId).name;
					return (
						<tr key={course.id}>
							<td>
								<Link to={'/course/' + course.slug}>{course.title}</Link>
							</td>
							<td>{(author && author) || 'Unknown'}</td>
							<td>{course.category}</td>
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
