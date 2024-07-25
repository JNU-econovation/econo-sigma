import styled from "styled-components";
import { React, useState, useContext} from "react";
import axios from 'axios';
import { AuthContext } from "../login/AuthProvider";




const StyledButton = styled.button`
    cursor: pointer;
    font-family: 'NanumSquareOTF', sans-serif;
    padding: 0.6em 1.5em;
    font-size: 0.9em;
    font-weight : 1000;
    border: none;
    border-radius : 2em;
    color: white;
    background: #FFA53F ;
    width: 6em;
    `;


const ApproveRejectButton = (bookApporoveId) => {
    const { accessToken } = useContext(AuthContext);

    const approvePost = () => {
        if (window.confirm("승인을 거절하시겠습니까?")) {
            
            const requestBody = {
                "bookApproveInfos": [bookApporoveId]
            };
            console.log(requestBody)
            axios.delete('http://43.202.196.181:8080/api/admin/books/approve', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                data: requestBody // 데이터 본문을 여기서 전달
            })
              .then(response => {
                console.log(response.data);
                window.location.reload();
              })
              .catch(error => {
                console.error(error);
              });
        }


    };


    return (
        <StyledButton onClick={approvePost}>
            거절
        </StyledButton>
    )
}

export default ApproveRejectButton;