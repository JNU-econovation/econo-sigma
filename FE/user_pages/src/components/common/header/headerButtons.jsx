import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {React, useState} from "react";

const StyledButton = styled.button`
        font-family: 'NanumSquareOTF', sans-serif;
        padding: 0.6em 2em;
        font-size: 0.8em;
        border: none;
        color: black;
        background: white;
    `;


const HeaderBtn = ({children, direction}) => {
    
     
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${direction}`);
    }



    return(
        <StyledButton onClick = {handleClick}>{children}</StyledButton>
    )


}

export default HeaderBtn 