import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../components/login/AuthProvider";
import { ReactComponent as LoginButton } from "../assets/login btn.svg";
import { useNavigate, Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 12em;
  margin-bottom: 3em;
  margin-right: 23em;
`;

const InputBox = styled.input`
  display: block;
  border: none;
  /* font-family: 'NanumSquareOTF', 'sans-serif'; */
  font-size: 1em;
  border-bottom: solid 1px #A4A4A4;
  width: 35em;
  height: 3.5em;
  margin-bottom: 0.7em;
  padding-left: 2.5em;
  /* -webkit-appearance: none; */
  &:focus {
    outline: none;
    cursor: text;
  };
`;

const AdminBtn = styled.div`
  font-family: 'NanumSquareOTF', sans-serif;
  font-size: 0.7em;
  font-weight: 700;
  color: #a4a4a4;
  margin-left: 40em;
  margin-top: 0.2em;
`;

const LoginBtn = styled(LoginButton)`
  margin-top: 1.8em;
  width: 13.5em;
  height: 4em;
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
`

const Login = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onClick = () => {
        navigate('http://localhost:3002/admin/login');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Container>
                <Logo src="/chackcheck.png" />
                <form onSubmit={handleSubmit}>
                    <InputBox
                        type="text"
                        placeholder="ID"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputBox
                        type="password"
                        placeholder="PW"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <AdminBtn>
                        <StyledLink to={'http://localhost:3002/admin/login'}>
                            관리자로 로그인
                        </StyledLink>
                    </AdminBtn>
                    <LoginBtn onClick={handleSubmit} />
                </form>
            </Container>
        </div>
    );
};

export default Login;