import React, { useContext } from 'react';
import Logo from './logo';
import HeaderBtn from './headerButtons';
import styled from "styled-components";
import { AuthContext } from '../../login/AuthProvider';

const HeaderWrapper = styled.header`
    z-index : 9999 ;
    position: fixed;
    width: 100%;
    height: 6.5em;
    border-bottom : 1px solid #EAEAEA;
    background-color: white;
`;

const ContentsWrap = styled.div`
    display: flex;
    width: 100%;
    justify-content : space-between ;
    align-items : end;
    margin-top: 1.5em;
`;

const Header = () => {
    const { accessToken, logout } = useContext(AuthContext);

    return (
        <HeaderWrapper>
            <ContentsWrap>
                <Logo />
                <div>
                    <HeaderBtn children={'도서등록'} direction={"users/form"} />
                    <HeaderBtn children={'마이페이지'} direction={"users"} />

                    {accessToken ? (
                            <HeaderBtn children={'로그아웃'} direction={"/books/all"} onClick={logout} />
                    ) : (
                        <HeaderBtn children={'로그인'} direction={"users/login"} />
                    )}
                </div>
            </ContentsWrap>
        </HeaderWrapper>
    );
}

export default Header;