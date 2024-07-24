
import styled from "styled-components";
import { React, useState, useContext } from "react";
import axios from 'axios';
import { AuthContext } from "../login/AuthProvider";



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
    const { accessToken } = useContext(AuthContext);


    const selectApprovePost = () => {
        if (selectedBooks.length === 0) {
            alert("선택된 도서가 존재하지 않습니다.");
        }

        else if (window.confirm("승인하시겠습니까?")) {
            const requestBody = {
                bookApproveInfos: selectedBooks.map(id => ({ bookApproveId: id }))
            };
            console.log(requestBody)
    
            axios.post(`http://43.202.196.181:8080/api/admin/books/approve`, requestBody, {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              })
                .then(response => {
                  console.log(response.data);
                })
                .catch(error => {
                  alert('승인에 실패했습니다.')
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