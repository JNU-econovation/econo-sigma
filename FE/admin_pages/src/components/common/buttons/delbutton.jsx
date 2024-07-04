import styled from "styled-components";
import {React, useState} from "react";


const StyledButton = styled.button`
    font-family: 'NanumSquareOTF', sans-serif;
    padding: 0.6em 1.5em;
    font-size: 0.8em;
    font-weight : 1000;
    border: none;
    border-radius : 2em;
    color: white;    
    `;


const DelButton = ({isAvailable}) => {
    // const [isAvailable, setAvailable] = useState({Response}.isAvailable)

    // const onClick = () => {
    //     setAvailable(!isAvailable)
    // }

    return (
        <StyledButton >
             // 이미지 추가
        </StyledButton>
    )
}

export default DelButton;