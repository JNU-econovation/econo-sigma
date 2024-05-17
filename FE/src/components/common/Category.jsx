import react from "react"
import styled from "styled-components"

const Nav = styled.div`
  display : flex;
  flex-direction: column;
  width: 9em;
  height: 100%;
  //background-color: aliceblue;
`
const Title = styled.div`
  color:#4D4ABF;
  font-family: 'NanumSquareOTF', sans-serif;
  font-weight: 800;
  font-size: 1.7em;
  //background-color: beige;
  text-align: center;
  margin: 0em 0.2em 0.3em 0.2em;
`;

const Item = styled.div`
  width: 80%;
  color: ${ props => props.click ? '#FB8500' : '#4D4ABF'};
  font-family: 'NanumSquareOTF', sans-serif;
  font-weight: ${ props => props.click ? 800 : 700};
  font-size: 1.2em; 
  text-decoration: ${ props => props.click ? 'underline' : 'none'};
  //background-color: lemonchiffon;
  display: flex;
  margin: 0.15em auto 0.15em 0.7em;
  text-align: center;
  
  //border: 1px solid red;
`;

const Index = styled.div`
  visibility: ${ props => props.click ? 'hidden' : 'visible'}; // 추후, hidden과 visible 자리 바꾸기
  width: 0.188em;
  height: 0.92em;
  border-radius: 0.5em;
  background-color: #FB8500;
  margin: 0em 0.4em  0em 0.2em; 
`;

function Category() {
    return (
      <Nav>
        <Title>Category</Title>
        <Item><Index/>FE</Item>
        <Item><Index/>BE</Item>
        <Item><Index/>AI</Item>
        <Item><Index/>UI/UX</Item>
        <Item><Index/>AOS/IOS</Item>
        <Item><Index/>기타</Item>
      </Nav>
    );
  };
  

export default Category;