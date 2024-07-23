
import styled from "styled-components";
import { React, useState } from "react";
import axios from 'axios';



const StyledButton = styled.button`
    margin-left: 1.6rem;
    display: flex;
    justify-content: left;
    align-items: flex-end;
    font-family: 'NanumSquareOTF', sans-serif;
    font-size: 0.8em;
    font-weight : 1000;
    border: none;
    background-color: transparent; 
    cursor: pointer; 
    padding: 0;    `;


const SelectApporove = ({ selectedBooks }) => {

    const selectApprovePost = () => {
        if (selectedBooks.length === 0) {
            alert("선택된 도서가 존재하지 않습니다.");
        }

        else if (window.confirm("승인하시겠습니까?")) {
            const requestBody = {
                bookApproveInfos: selectedBooks.map(id => ({ bookApproveId: id }))
            };
    
            axios.post('api주소', requestBody)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        
    };

    return (
        <StyledButton onClick={selectApprovePost}>
            선택 도서 승인
        </StyledButton>
    )
}

export default SelectApporove;