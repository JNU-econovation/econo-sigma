import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Detail from "../Detail.jsx";

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
		height: 20em;
		font-size : 0.8em;
	}

	thead tr {
		background-color: #F1F1F1;
		height: 3em;
		font-size : 0.8em;
	}
	
	thead th:nth-child(1) {
		width: 2em;
	}

	thead th:nth-child(5) {
		width: 10%;
	}



`;
const bookInfoHeaders = [
    {
        text: '',
        value: 'checkBox'
    },
    {
        text: '',
        value: 'bookIndex'
    },
    {
        text: '도서 정보',
        value: 'bookInfo'
    },
    {
        text: '도서 신청자 정보',
        value: 'applicant'
    },
    {
        text: '승인 버튼',
        value: 'apporveButton'
    }

];


const BookApproveTable = ({ response }) => {

    console.log(response)

    const bookApproveInfos = response.data.books
    const bookInfoTableHeader = bookInfoHeaders
    const headerKey = bookInfoHeaders.map((header) => header.value)
    const bookApproveInfo = bookApproveInfos.map((info) => info.bookApproveInfo)
    console.log(bookApproveInfo)

    return (

        <Styledtable>
            <table>
                <thead>
                    <tr>

                        {
                            bookInfoTableHeader.map((header) =>
                                <th key={header.text}> {header.text} </th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        bookApproveInfos.map((item, index) => (

                            <tr key={index}>
                                {
                                    <td key={'bookIndex' + index}>
                                        ㅁ 
                                        {/* 체크박스 삽입 예정 */}  
                                    </td>
                                }
                                {
                                    <td key={'bookIndex' + index}>
                                        {index + 1}
                                    </td>
                                }
                                {
                                    <td key={'bookInfo' + index}>
                                        <Detail />
                                    </td>

                                }
                                {
                                    <td key={'applicant' + index}>
                                        {item.author}
                                        {/* 도서 신청자로 변경 필요 */}
                                    </td>

                                }
                                {
                                    <td key={'apporoveButton' + index}>
                                        버튼자리
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

export default BookApproveTable;