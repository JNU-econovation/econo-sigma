import styled from "styled-components";
import { React, useState } from "react";


const StyledButton = styled.button`
    font-family: 'NanumSquareOTF', sans-serif;
    font-size: 0.8em;
    font-weight : 1000;
    border: none;
    background-color: transparent; 
    cursor: pointer; 
    padding: 0;    `;


const UpdateButton = ({ isAvailable }) => {
    // const [isAvailable, setAvailable] = useState({Response}.isAvailable)

    // const onClick = () => {
    //     setAvailable(!isAvailable)
    // }

    return (
        <StyledButton >
            <img src="/update.png" width="15rem" height="15rem" />
        </StyledButton>
    )
}

export default UpdateButton;