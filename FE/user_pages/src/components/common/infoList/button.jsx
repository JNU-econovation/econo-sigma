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
    background: ${props => props.isAvailable ? '#FFA53F' : '#6A67E0' };
    
    `;


const Button = ({isAvailable}) => {
    // const [isAvailable, setAvailable] = useState({Response}.isAvailable)

    // const onClick = () => {
    //     setAvailable(!isAvailable)
    // }

    return (
        <StyledButton isAvailable ={isAvailable} >
            {isAvailable ? '대출' : '반납'}
        </StyledButton>
    )
}

export default Button;