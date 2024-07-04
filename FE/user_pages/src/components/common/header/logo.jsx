// import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import styledButton from './headerButtons';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";



const StyledButton = styled.button`    
    padding: 0em 2em;
    border: none;
    color: black;
    background: white;
    `;

const Logo = ({ children }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/books`);
    }



    return (
        <StyledButton onClick={handleClick}>
            <img src="/chackcheck.png" width="150px" height="60px" />
        </StyledButton>
    )

}

export default Logo;