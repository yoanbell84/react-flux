/* eslint-disable array-callback-return */
import React from 'react';
import PropTypes from 'prop-types';

const TableComponent = props => {
	const { elements } = props;
	if (elements.length === 0) return <h3>No Available Data</h3>;
	const columns = Object.keys(elements[0]);
	const hiddenColumns = props.hiddenColumns;
	const isHidden = column => {
		if (hiddenColumns) return hiddenColumns.includes(column);
	};

	return (
		<table className='table responsive striped bordered hover'>
			<thead>
				<tr>
					{columns.map((column, index) => {
						if (!isHidden(column)) {
							return (
								<th key={index} style={{ textTransform: 'capitalize' }}>
									{column}
								</th>
							);
						}
					})}
				</tr>
			</thead>
			<tbody>
				{elements.map((element, index) => {
					return (
						<tr key={element.id ? element.id : index}>
							{columns.map((column, j) => {
								if (!isHidden(column)) {
									return (
										<td style={{ textTransform: 'capitalize' }} key={j}>
											{element[column]}
										</td>
									);
								}
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

TableComponent.propTypes = {
	elements: PropTypes.array.isRequired,
	hiddenColumns: PropTypes.array,
};

export default TableComponent;
