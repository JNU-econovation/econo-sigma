import React from "react";
import styled from "styled-components";
import { IoIosTrash } from "react-icons/io";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Title from "../components/common/Title";
import { AuthContext } from "../components/common/login/AuthProvider";


const Styled = styled.div`
    /* background-color: aqua; */
    padding-top: 1.5em;
    form {
      width: 90%;

      /* background-color: yellowgreen; */
    }

    .contents {
      padding-left: 17rem;
      padding-top: 9em;
      width:80%;
    }

    .register {
      margin-left: 1.5rem;
      margin-top: 2rem;
    }

`

// const Title = styled.div`
//     font-family: 'NanumSquareOTF', 'sans-serif';
//     font-size: 1.5em;
//     font-weight: 700;
//     position: relative;
//     right: 20em;
//     top: 7em;
//     background-color: aliceblue;
// `;
const Index = styled.span`
    font-family: 'NanumSquareOTF', 'sans-serif';
    font-size: 0.9em;
    //background-color: antiquewhite;
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
const AddBtn = styled.button`
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
    width: 90%;
    /* position: relative; */
    margin-top: 2rem;
    margin-bottom: 2rem;
    /* left: 1em; */
`;
const Table = styled.table`
  width: 90%;
  border-collapse: collapse;

  margin-bottom: 1.25em;
  position: relative;
  /* top: 15em; */
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
const RegisterBtn = styled.button`
  float: right;
  margin-right: 10%;
  /* margin-right: 12rem; */
  /* position: relative; */
  /* top: 20em; */
  padding: 0.625em 1.25em;
  /* margin: 0.313em; */
  background-color: #4D4ABF;
  color: white;
  border: none;
  border-radius: 0.313em;
  cursor: pointer;

  &:hover {
    background-color: #423fa8;
  }
`;

const Button = styled.button`

  display: inline;
  padding: 0.625em 1.25em;
  /* margin: 0.313em; */
  background-color: #6a5acd;
  color: white;
  border: none;
  border-radius: 0.313em;
  cursor: pointer;
  &:hover {
    background-color: #483d8e;
  }
`;

const RegisterMember = () => {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const AddMember = (e) => {
    e.preventDefault();
    setMembers([
      ...members,
      { loginId, password, name, grade }
    ]);
    setName(e.target.value);
    setGrade(e.target.value);
    setLoginId(e.target.value);
    setPassword(e.target.value);
  };

  const registerMembers = () => {
    axios.post('http://43.202.196.181:8080/admin/users', { members })
      .then(response => {
        console.log('성공', response);
      })
      .catch(error => {
        console.error('error', error);
      });
  };

  return (
    <Styled>

      <div className="contents">
        <Title title='회원등록' sub=' '>  </Title>
        <div className="register">
          <form style={{ position: "relative"}}>
            <Index>이름</Index> <Value type="text" value={name} onChange={(e) => setName(e.target.value)} ></Value>
            <Index>기수</Index> <Value type="text" value={grade} onChange={(e) => setGrade(e.target.value)}></Value>
            <Index>ID</Index> <Value type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)}></Value>
            <Index>비밀번호</Index> <Value type="text" value={password} onChange={(e) => setPassword(e.target.value)}></Value>
            <AddBtn onClick={AddMember}>+</AddBtn>
            <Line />
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
                  <Td isOdd={index % 2 !== 0}>{member.grade}</Td>
                  <Td isOdd={index % 2 !== 0}>{member.loginId}</Td>
                  <Td isOdd={index % 2 !== 0}>{member.password}</Td>
                  <Td isOdd={index % 2 !== 0}>
                    <Button onClick={() => {
                      setMembers(members.filter((_, i) => i !== index));
                    }}>
                      <IoIosTrash />
                    </Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
          <RegisterBtn onClick={registerMembers}>등록</RegisterBtn>
        </div>
        {console.log(members)}              
      </div>
    </Styled>

  );
}

export default RegisterMember;