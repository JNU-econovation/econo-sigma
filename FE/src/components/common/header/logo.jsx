// import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import {Link} from 'react-router-dom' ;
import styledButton from './headerButtons';
import styled from "styled-components";


const StyledButton = styled.button`    
    padding: 0em 2em;
    border: none;
    color: black;
    background: white;
    `;

const Logo = () => {
    return (
        <div>
            <StyledButton>
                <img src = "/chackcheck.png" width="150px" height = "60px"/>
            </StyledButton>
        </div>
    )
}

export default Logo ;