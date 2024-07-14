import styled from "styled-components";
import { React, useState } from "react";
import axios from 'axios';



const StyledButton = styled.button`
    cursor: pointer;
    font-family: 'NanumSquareOTF', sans-serif;
    padding: 0.6em 1.5em;
    font-size: 0.9em;
    font-weight : 1000;
    border: none;
    border-radius : 2em;
    color: white;
    background: #6A67E0 ;
    width: 6em;
    `;


const ApproveButton = (bookApporoveId) => {

    const approvePost = () => {
        if (window.confirm("승인하시겠습니까?")) {
            const requestBody = {
                "bookApproveInfos": [bookApporoveId]
            };
            console.log(requestBody)

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
        <StyledButton onClick={approvePost}>
            승인
        </StyledButton>
    )
}

export default ApproveButton;