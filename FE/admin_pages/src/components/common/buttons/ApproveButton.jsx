import styled from "styled-components";
import {React, useState} from "react";


const StyledButton = styled.button`
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


const ApproveButton = () => {
    // const [isAvailable, setAvailable] = useState({Response}.isAvailable)

    const onClick = () => {
    }

    return (
        <StyledButton onClick={onClick}>
            승인
        </StyledButton>
    )
}

export default ApproveButton;