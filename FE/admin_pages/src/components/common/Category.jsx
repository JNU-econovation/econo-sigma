import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  flex-direction: column;
  width: 10em;
  height: 80%;
  position: fixed;
  float: left;
  margin-top: 10em;
  margin-left: 2em;
`;

const Title = styled.div`
  color: #4d4abf;
  font-family: 'NanumSquareOTF', sans-serif;
  font-weight: 800;
  font-size: 1.4em;
  text-align: left;
  margin: 0.6em auto 0.15em 0.9em;
`;

const Item = styled.div`
  width: 80%;
  color: ${props => props.hover || props.select ? '#FB8500' : '#4D4ABF'};
  font-family: 'NanumSquareOTF', sans-serif;
  font-weight: ${props => props.select ? 800 : 700};
  font-size: 1.1em; 
  text-decoration: ${props => props.hover || props.select ? 'underline' : 'none'};
  display: inline-flex;
  margin: 0.6em auto 0.15em 0.7em;
  text-align: center;
`;

const Index = styled.div`
  visibility: ${props => props.select ? 'visible' : 'hidden'};
  width: 0.188em;
  height: 0.92em;
  border-radius: 0.5em;
  background-color: #FB8500;
  margin: 0em 0.4em 0em 0.2em; 
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #FB8500;
  }

  &:visited {
    color: inherit;
  }
`;

const categories = [
  { name: "회원관리", link: "/admin/users/register" },
  { name: "회원등록", link: "/admin/users" },
  { name: "도서관리", link: "/admin/books?page=1" },
  { name: "도서승인", link: "/admin/books/approve" },
  { name: "도서등록", link: "/books"}
];

function Category() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const onClick = (index) => {
    setSelected(index);
  };

  const onMouseEnter = (index) => {
    setHovered(index);
  };

  const onMouseLeave = () => {
    setHovered(null);
  };

  return (
    <Nav>
      <Title>관리자 페이지</Title>
      {categories.map((category, index) => (
        <Item
          key={index}
          select={selected === index}
          hover={hovered === index}
          onClick={() => onClick(index)}
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={onMouseLeave}
        >
          <Index select={selected === index} />
          <StyledLink to={category.link} style={{ textDecoration: "none" }}>
            {category.name}
          </StyledLink>
        </Item>
      ))}
    </Nav>
  );
}

export default Category;