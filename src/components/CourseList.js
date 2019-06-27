import React from 'react';
import TableComponent from './common/TableComponent';
import PropTypes from 'prop-types';

const CourseList = props => {
	const { courses } = props;
	const elements = courses.map(({ id, title, authorId, category }) => ({ id, title, authorId, category }));
	const hiddenColumns = ['id'];

	return <TableComponent elements={elements} hiddenColumns={hiddenColumns} />;
};

CourseList.propTypes = {
	courses: PropTypes.array.isRequired,
};

export default CourseList;
