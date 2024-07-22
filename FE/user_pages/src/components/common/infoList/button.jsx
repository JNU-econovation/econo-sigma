import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../../login/AuthProvider';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled.button`
  cursor: pointer;
  font-family: 'NanumSquareOTF', sans-serif;
  padding: 0.6em 1.5em;
  font-size: 0.8em;
  font-weight: 1000;
  border: none;
  border-radius: 2em;
  color: white;
  background: ${props => props.isAvailable ? '#FFA53F' : '#6A67E0'};
`;

const Button = ({ available, bookDetailId }) => {
  const [isAvailable, setAvailable] = useState(available);
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const postAvailable = () => {
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      navigate('/users/login');
      return;
    }

    if (isAvailable) {
      if (window.confirm("도서를 대출하시겠습니까?")) {
        const requestBody = {
        };
        axios.put(`http://43.202.196.181:8080/api/books/${bookDetailId}/borrow`, requestBody, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => {
            console.log(response.data);
            setAvailable(!isAvailable);
          })
          .catch(error => {
            console.error(error);
          });
      }
    } else {
      if (window.confirm("도서를 반납하시겠습니까?")) {
        const requestBody = {
        };
        axios.put(`http://43.202.196.181:8080/api/books/${bookDetailId}/return`, requestBody, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => {
            console.log(response.data);
            setAvailable(!isAvailable);
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };

  return (
    <StyledButton isAvailable={isAvailable} onClick={postAvailable}>
      {isAvailable ? '대출' : '반납'}
    </StyledButton>
  );
};

export default Button;