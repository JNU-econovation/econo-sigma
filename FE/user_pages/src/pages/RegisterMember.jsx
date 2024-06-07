import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const Title = styled.div`
    font-family: 'NanumSquareOTF', 'sans-serif';
    font-size: 1.5em;
    font-weight: 700;
    position: relative;
    right: 20em;
    top: 7em;
    background-color: aliceblue;
`;
const Index = styled.span`
    font-family: 'NanumSquareOTF', 'sans-serif';
    font-size: 0.9em;
    background-color: antiquewhite;
`;
const Value = styled.input`
    font-family: 'NanumSquareOTF', 'sans-serif';
    font-size: 0.7em;
    margin-right: 2em;
    height: 2em;
    border: 0.02em solid #a8a8a8;
    border-radius: 0.3em;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;
const AddButton = styled.button`
    width: 1.2em;
    height: 1.2em;
    color: #4D4ABF;
    font-size: 1.7em;
    background-color: #D9D9D9;
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0.25em;
    margin-left: 0.2em;
    position: relative;
    top: 0.2em;
`;
const Line = styled.hr`
    color: #d9d9d9;
    width: 80%;
    margin-top: 2em;
    position: relative;
    left: 1em;
`;
const Table = styled.table`
  width: 78%;
  border-collapse: collapse;
  margin-bottom: 20px;
  position: relative;
  left: 10em;
  top: 15em;
`;
const Th = styled.th`
  background-color: #DBDBF2;
  padding: 1em;
  font-size: 1.1em;
`;
const Td = styled.td`
  padding: 0.8em;
  background-color: ${({ isOdd }) => (isOdd ? '#F6F6FC' : '#ffffff')};
`;
const Button = styled.button`
  position: relative;
  bottom: 1em;
  padding: 10px 20px;
  margin: 5px;
  background-color: #6a5acd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #483d8b;
  }
`;

const RegisterMember = () => {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const AddMember = () => {
    setMembers([
      ...members,
      { name, group, id, password }
    ]);
    setName('');
    setGroup('');
    setId('');
    setPassword('');
  };

  const registerMembers = () => {
    axios.post('https://www.chackcheck.com/admin/users', { members })
      .then(response => {
        console.log('성공', response);
      })
      .catch(error => {
        console.error('error', error);
      });
  };

  return (
        <div>
            <Title>회원등록</Title>
            <form style={{position:"relative", top:"12em", right:"1em"}}>
                <Index>이름</Index> <Value></Value>
                <Index>기수</Index> <Value></Value>
                <Index>ID</Index> <Value></Value>
                <Index>비밀번호</Index> <Value></Value>
                <AddButton type="submit">+</AddButton>
                <Line></Line>
            </form>
            <Table>
              <thead>
                <tr>
                  <Th>번호</Th>
                  <Th>이름</Th>
                  <Th>기수</Th>
                  <Th>ID</Th>
                  <Th>비밀번호</Th>
                  <Th>삭제</Th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <tr key={index}>
                    <Td isOdd={index % 2 !== 0}>{index + 1}</Td>
                    <Td isOdd={index % 2 !== 0}>{member.name}</Td>
                    <Td isOdd={index % 2 !== 0}>{member.group}</Td>
                    <Td isOdd={index % 2 !== 0}>{member.id}</Td>
                    <Td isOdd={index % 2 !== 0}>{member.password}</Td>
                    <Td isOdd={index % 2 !== 0}>
                      <Button onClick={() => {
                        setMembers(members.filter((_, i) => i !== index));
                      }}>
                        🗑️
                      </Button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button onClick={registerMembers}>등록</Button>
            
        </div>
        
    );
}

export default RegisterMember;