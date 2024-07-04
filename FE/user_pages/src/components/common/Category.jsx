import React, { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Nav = styled.div`
  flex-direction: column;
  width: 9em;
  height: 80%;

  position: fixed;
  float: left;

  margin-top: 10em;
  margin-left: 2em;

  /* position: absolute; */
`
const Title = styled.div`
  color:#4D4ABF;
  font-family: 'NanumSquareOTF', sans-serif;
  font-weight: 800;
  font-size: 1.5em;
  //background-color: beige;
  text-align: center;
  margin: 0em 0.2em 0.3em 0.2em;
`;
const Item = styled.div`
  width: 80%;
  color: ${ props => props.hover||props.select ? '#FB8500' : '#4D4ABF'};
  font-family: 'NanumSquareOTF', sans-serif;
  font-weight: ${ props => props.select ? 800 : 700};
  font-size: 1.1em; 
  text-decoration: ${ props => props.hover||props.select ? 'underline' : 'none'};
  
  display: inline-flex;
  margin: 0.15em auto 0.15em 0.7em;
  text-align: center;
  //border: 1px solid red;
`;
const Index = styled.div`
  visibility: ${ props => props.select ? 'visible' : 'hidden'}; // 추후, hidden과 visible 자리 바꾸기
  width: 0.188em;
  height: 0.92em;
  border-radius: 0.5em;
  background-color: #FB8500;
  margin: 0em 0.4em  0em 0.2em; 
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #FB8500; // 링크에 hover 효과를 주고 싶을 경우
  }

  &:visited {
    color: inherit; // 방문한 링크 색상을 기본 색상으로 유지
  }
`;


const categories = ["ALL","전공서적", "FE", "BE", "AI", "UI/UX", "AOS/IOS", "기타"];

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
      <Title>Category</Title>
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
          <StyledLink to={`http://localhost:3000/books/category=${encodeURIComponent(category)}&page=1` } style={{ textDecoration: "none" }}>{category}</StyledLink>
        </Item>
      ))}
    </Nav>
  );
}
  

export default Category;