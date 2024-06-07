import React from "react";
import styled from "styled-components";
import { ReactComponent as LoginButton} from "../assets/login btn.svg";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    //background-color: antiquewhite;
`
const Logo = styled.img`
    width: 12em;
    margin-bottom: 3em;
    margin-right: 23em;
`;

const InputBox = styled.input`
    display: block;
    border: none;
    font-family: 'NanumSquareOTF', 'sans-serif';
    font-size: 1em;
    border-bottom: solid 1px #A4A4A4;
    width: 35em;
    height: 3.5em;
    margin-bottom: 0.7em;
    padding-left: 2.5em;
    -webkit-appearance: none;
    &:focus {
        outline: none;
        cursor: text;
    };

`

const AdminBtn = styled.div`
    font-family: 'NanumSquareOTF', sans-serif;
    font-size: 0.7em;
    font-weight: 700;
    color: #a4a4a4;
    margin-left: 40em;
    margin-top: 0.2em;
`
const LoginBtn = styled(LoginButton)`
    margin-top: 1.8em;
    width: 13.5em;
    height: 4em;
`;

const Login = () => {
    return (
        <div style={{display:"flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <Container>
                <Logo src="/chackcheck.png"/>
                <InputBox placeholder="ID"></InputBox>
                <InputBox placeholder="PW"></InputBox>
                <AdminBtn>관리자로 로그인</AdminBtn>
                <LoginBtn/>
            </Container>
        </div>
    );
}

export default Login;