
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  /* 스타일 설정 */        
        font-family: 'NanumSquareOTF', sans-serif;
        padding: 0.6em 2em;
        font-size: 0.8em;
        border: none;
        color: black;
        background: white;
`;

const HeaderBtn = ({ children, direction, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(direction);
  };

  return (
    <Button onClick={handleClick}>
      {children}
    </Button>
  );
};

export default HeaderBtn;