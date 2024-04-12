import React from 'react';

import Logo from './logo' ;
import HeaderBtn from './headerButtons';
import styled from "styled-components";

const HeaderWrapper = styled.header`
    // z-index : 9999 ;
    width: 100%;
    // position: fixed;
    background-color : white;
    border-bottom : 1px solid #EAEAEA;
`;

const ContentsWrap = styled.div `
    display: flex;
    justify-content : space-between ;
    align-items : end;
    margin : 20px;
    `;


const Header = () => {
    return (
            <HeaderWrapper>
                <ContentsWrap>
                    <Logo />
                    <div>
                        <HeaderBtn children={'회원가입'} direction = {"join"}/>
                        <HeaderBtn children={'로그인'} direction = {"login"}/>
                        <HeaderBtn children={'마이페이지'} direction = {"mypage"}/>
                    </div>
                </ContentsWrap>
            </HeaderWrapper>

    )
}

export default Header ;