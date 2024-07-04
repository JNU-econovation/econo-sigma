import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const StyledMyPageCategory = styled.div`
    font-size: 1.2em;

    button {
        border: none;
        background-color: white;
        font-size: 0.9em;
        font-weight: 500;
        margin-right: 0.3em;

    &:hover {
      color:gray;
    }
/* 
    &.active {
      text-decoration: underline;
    } */

    &:disabled {
      cursor: default;
      opacity: 0.5;}
        
    }

    span {
      visibility: hidden;
    }

    span.active {
      margin-left: 0.5em;
      visibility: visible;
      color: red;
      font-weight: 600;
    }
`
 


function MyPageCategory() {

  const navigate = useNavigate();


  const [selected, setSelected] = useState("user");

  const goToUser = () => {
    navigate(`/users/usersid`);
    setSelected("user");
  }

  const goToBook = () => {
    navigate(`/books/users`);
    setSelected("book")
  }


  return (
    <StyledMyPageCategory>
      <span className={selected === "user" ? 'active' : ''}>*</span>
      <button className={selected === "user" ? 'active' : ''}
        onClick = {goToUser}>
          
          현재 대출 중인 도서
      </button>
      ㅣ
      <span className={selected === "book" ? 'active' : ''}>*</span>
      <button className={selected === "book" ? 'active' : ''}
        onClick = {goToBook}>
          대출 이력
      </button>
    </StyledMyPageCategory>
  );
}


export default MyPageCategory;