import React, { useEffect, useState } from "react";
import styled from "styled-components" ;
import { useParams } from "react-router-dom";

const Styledtable = styled.div`
	min-width: 40em;
	table {
		font-family: 'NanumSquareOTF', sans-serif;
		padding: 0.6em 1.5em;
		width: 90%;
		border-spacing: 0;
		
	}
	
	td {
		height: 2.5em;
		font-size: 0.9em;

	}

	.isAvailable.available {
		color: black; 
	}
	
	.isAvailable.unavailable {
		color: red; 
	}

	tbody td{
		height: 2.7em;
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
const infoHeaders = [
	{
		text: '' ,
		value: 'bookIndex'
	  },
	{
		text: '도서 이름' ,
		value: 'bookName'
	},
	{
	  text: '도서ID' ,
	  value: 'bookDetailId'
	},
	{
	  text: '카테고리' ,
	  value: 'category'
	},
	{
	  text: '대출가능여부' ,
	  value: 'isAvilable'
	},
	{
	  text: '수정' ,
	  value: 'updateButton'
	},
	{
		text: '삭제' ,
		value: 'delButton'
	}
  ];


const BookTable = ({response}) => {
	
	console.log(response.data)

	const bookInfos = response.data.bookInfo
	const infoTableHeader = infoHeaders
	const headerKey = infoTableHeader.map((header) => header.value)
	

	
	return (
	
        <Styledtable>
			<table>
			<thead>
				<tr>
				
					{
					infoTableHeader.map((header) => 
						<th key = {header.text}> {header.text} </th>
					)
					}
				</tr>
			</thead>
			<tbody>
				{
					bookInfos.map((item, index)=> (
						<tr key = {index}>
							{
								<td key = {'bookIndex' + index}>
									{index+1}
								</td>
							}
							{	
								<td key = {'bookName' + index}>
									{item.title} 
								</td> 
								
							}
							{	
								<td key = {'bookId' + index}>
									{item.bookId} 
								</td> 
								
							}
							{	
								<td key = {'category' + index}>
									{item.categories}														
								</td> 
								
							}
							{
								<td className= {`isAvailable ${item.isAvailable ? 'available' : 'unavailable'}`} key = {'Button' + index}>
									{item.borrowStatus} 
								</td>
							}
														{
								<td key = {'update' + index}>
									{/* <Button isAvailable = {item.isAvailable}/> */}
								</td>
							}

							{
								<td key = {'delButton' + index}>
									{/* <Button isAvailable = {item.isAvailable}/> */}
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

export default BookTable ;