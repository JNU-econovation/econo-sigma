import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import UpdateButton from "../buttons/CorrectButton";
import DelButton from "../buttons/delbutton";

const Styledtable = styled.div`
	min-width: 40em;
	table {
		font-family: 'NanumSquareOTF', sans-serif;
		padding: 0.6em 1.5em;
		width: 90%;
		border-spacing: 0;
		
	}
	
	td {
		padding-top: 1em ;
		padding-bottom:1em;
		font-size: 0.9em;

	}

	.isAvailable.available {
		color: blue; 
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
const userInfoHeaders = [
	{
		text: '',
		value: 'userIndex'
	},
	{
		text: '이름',
		value: 'userName'
	},
	{
		text: 'ID',
		value: 'userID'
	},
	{
		text: '현재 대출 중 도서',
		value: 'currentBorrowedBooks'
	},
	{
		text: '연체 여부',
		value: 'penaltyStatus'
	},
	{
		text: '수정',
		value: 'updateButton'
	},
	{
		text: '삭제',
		value: 'delButton'
	}
];


const UserTable = ({ response }) => {

	console.log(response)

	const userInfos = response.data.userInfos.userInfos
	const userInfoTableHeader = userInfoHeaders



	return (

		<Styledtable>
			<table>
				<thead>
					<tr>

						{
							userInfoTableHeader.map((header) =>
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
									<td key={'userIndex' + index}>
										{index + 1}
									</td>
								}
								{
									<td key={'userName' + index}>
										{item.userName}
									</td>

								}
								{
									<td key={'userID' + index}>
										{item.userId}
									</td>

								}
								{
									<td key={'currentBorrowedBooks' + index}>
										{item.curruentBorrowedBooks.curruentBorrowedBooks.length > 0 ? (
											item.curruentBorrowedBooks.curruentBorrowedBooks.map((book) => <span style={{ display: 'block' }} key={book.id}> {book.title}</span>)
										) : 
											" "
										}									
									</td>

								}
								{
									<td key={'penaltyStatus' + index} className={`isAvailable ${!item.penaltyStatus ? 'available' : 'unavailable'}`} >
										{!item.penaltyStatus ? '대출가능' : '연체'}
									</td>
								}
								{
									<td key={'update' + index}>
										<UpdateButton />
									</td>
								}

								{
									<td key={'delButton' + index}>
										<DelButton />
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

export default UserTable;