import React, { useEffect, useState } from "react";
import styled from "styled-components" ;
import { useParams } from "react-router-dom";
import Button from './button.jsx'

const Styledtable = styled.div`
	min-width: 40em;
	table {
		font-family: 'NanumSquareOTF', sans-serif;
		padding: 0.6em 1.5em;
		/* border: none; */
		width: 90%;
		border-spacing: 0;
		
	}
	
	td {
		height: 2.5em;
		font-size: 0.95em;

	}

	.isAvailable.available {
		color: black; 
	}
	
	.isAvailable.unavailable {
		color: red; 
	}

	tbody td{
		height: 3em;
	}

	thead tr {
		background-color: #F1F1F1;
		height: 3em;
		font-size : 0.8em;
	}
	
	thead th:nth-child(1) {
		width: 20%;
	}


	thead th:nth-child(5) {
		width: 20%;
	}

`;
const infoHeaders = [
	{
	  text: '도서ID' ,
	  value: 'bookDetailId'
	},
	{
	  text: '대출자 정보' ,
	  value: 'member'
	},
	{
	  text: '반납 예정일' ,
	  value: 'dueDate'
	},
	{
	  text: '대출가능여부' ,
	  value: 'isAvilable'
	},
	{
	  text: '' ,
	  value: 'button'
	}
  ];


const InfoTable = ({response}) => {
	

	const borrowInfos = response.data.borrowInfos
	const infoTableHeader = infoHeaders
	const headerKey = infoTableHeader.map((header) => header.value)
	const borrowInfo = borrowInfos.map((info) => info.borrowInfo)
	
	const member = borrowInfos.map((info) => {
		return info.borrowInfo !== null ? info.borrowInfo.member : null
	})
	console.log(borrowInfos)
	
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
					borrowInfos.map((item, index)=> (
						<tr key = {index}>
							{}
							{
								<td key = {'bookDetailId' + index}>
									{item.bookDetailId}
								</td>
							}
							{	
								<td key = {'member' + index}>
									{item.borrowInfo !== null ? item.borrowInfo.member : '-'} 
								</td> 
								
							}
							{	
								<td key = {'dueDate' + index}>
									{item.borrowInfo !== null ? item.borrowInfo.dueDate : '-'} 
								</td> 
								
							}

							{
								<td className= {`isAvailable ${item.isAvailable ? 'available' : 'unavailable'}`} key = {'Button' + index}>
									{item.isAvailable ? '가능' : '불가'}
								</td>
							}

							{
								<td key = {'Button' + index}>
									<Button isAvailable = {item.isAvailable} bookDetailId={item.bookDetailId}/>
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

export default InfoTable ;