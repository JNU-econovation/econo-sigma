import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Styledtable = styled.div`
	min-width: 40em;
	table {
		font-family: 'NanumSquareOTF', sans-serif;
		/* padding: 0.6em 1.5em; */
		width: 100%;
		border-spacing: 0;

		
	}
	td, th {
    text-align: center; /* Center-align text in table cells */
  }
	td {
		padding-top: 1em ;
		padding-bottom:1em;
		font-size: 0.9em;
		float: center;

	}

	.isAvailable.available {
		color: black; 
	}
	
	.isAvailable.unavailable {
		color: red; 
	}

	tbody td{
		/* height: 2.7em; */
		font-size : 0.8em;

	}

	thead tr {
		background-color: #E7E6FF;
		height: 3em;
		font-size : 0.8em;
	}
	
	thead th:nth-child(1) {
		width: 2em;
	}
	tbody tr:nth-child(even) {
		background-color: #F9F9FF;
	}



`;
const headers = [
	{
		text: '',
		value: 'borrowIndex'
	},
	{
		text: '도서 ID',
		value: 'bookId'
	},
	{
		text: '도서 이름',
		value: 'bookName'
	},
	{
		text: '대출일',
		value: 'borrowDate'
	},
	{
		text: '반납일',
		value: 'returnDate'
	}

];


const MyPageTable = ({ response }) => {

	console.log(response)
	const userInfos = response.data
	console.log(userInfos)
	const tableHeaders = headers



	return (

		<Styledtable>
			<table>
				<thead>
					<tr>

						{
							tableHeaders.map((header) =>
								<th key={header.text}> {header.text} </th>
							)
						}
					</tr>
				</thead>
				<tbody>
					{
						userInfos.map((item, index) => (
							<tr key={index}>
								{
									<td key={'borrowIndex' + index}>
										{index + 1}
									</td>
								}
								{
									<td key={'bookId' + index}>
										{item.bookDetailId}
									</td>

								}
								{
									<td key={'bookName' + index}>
										{item.title}
									</td>

								}
								{
									<td key={'borrowDate' + index}>
										{item.borrowDate}
									</td>

								}
								{
									<td key={'returnDate' + index} className={`isAvailable ${item.penaltyStatus ? 'available' : 'unavailable'}`} >
										{item.returnDate}
									</td>
								}
							</tr>
						))
					}

				</tbody>
			</table>

		</Styledtable>
	)
}

export default MyPageTable;