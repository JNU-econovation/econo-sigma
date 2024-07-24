import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Detail from "../Detail.jsx";
import ApproveButton from "../buttons/ApproveButton.jsx";
import SelectApporove from "../buttons/SelectApporove.jsx";

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


    tbody td:nth-child(3) {
        padding-left: 3rem;
        justify-content: flex-start;
    }


	thead tr {
		background-color: #F1F1F1;
		height: 3em;
		font-size : 0.8em;
	}
	

    thead th:nth-child(1), th:nth-child(2) {
		width: 2rem;
	}

	thead th:nth-child(5) {
		width: 10%;
	}



`;
const bookInfoHeaders = [
    {
        text: <input type="checkbox" />,
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
    const bookApproveInfos = response.data.bookApproveInfos
    const bookInfoTableHeader = bookInfoHeaders

    // 체크 박스를 이용한 선택 구현
    const [selectedBooks, setSelectedBooks] = useState([]);
    console.log(selectedBooks)

    const selectCheckBox = (bookApproveId) => {
        setSelectedBooks(prevSelected =>
            prevSelected.includes(bookApproveId) ? prevSelected.filter(id => id !== bookApproveId)
                : [...prevSelected, bookApproveId]
        );
    };

    const selectAllCheckBox = (e) => {
        if (e.target.checked) {
            const allBookIds = bookApproveInfos.map(book => book.id);
            setSelectedBooks(allBookIds);
        } else {
            setSelectedBooks([]);
        }
    }

    return (

        <Styledtable>
            <SelectApporove selectedBooks = {selectedBooks}/>
            <table>
                <thead>
                    <tr>

                        {
                            bookInfoTableHeader.map((header) =>
                                <th key={header.text}>
                                    {header.value === 'checkBox'
                                        ? <input type="checkbox" onChange={selectAllCheckBox} />
                                        : header.text}
                                </th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        bookApproveInfos.map((item, index) => (

                            <tr key={index}>
                                {
                                    <td key={'checkBox ' + index}>
                                        <input type="checkbox"  
                                        checked={selectedBooks.includes(item.id)} 
                                        onChange={() => selectCheckBox(item.id)} 
                                    />
                                    </td>
                                }
                                {
                                    <td key={'bookIndex' + index}>
                                        {index + 1}
                                    </td>
                                }
                                {
                                    <td key={'bookInfo' + index}>
                                        <Detail data={item} />
                                    </td>

                                }
                                {
                                    <td key={'applicant' + index}>
                                        {item.bookApplicant}
                                    </td>

                                }
                                {
                                    <td key={'apporoveButton' + index}>
                                        <ApproveButton bookApproveId = {item.id} />
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