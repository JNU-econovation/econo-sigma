import React from 'react';

import Logo from './logo' ;
import HeaderBtn from './headerButtons';
import styled from "styled-components";

const HeaderWrapper = styled.header`
    z-index : 9999 ;
    position: fixed;

    width: 100%;
    height: 6.5em;
    border-bottom : 1px solid #EAEAEA;
    background-color: white;
`;

const ContentsWrap = styled.div `
    display: flex;
    width: 100%;
    
    justify-content : space-between ;
    align-items : end;
    margin-top: 1.5em;
    `;


const Header = () => {
    return (
            <HeaderWrapper>
                <ContentsWrap>
                    <Logo />
                    <div class=''>
                        <HeaderBtn children={'도서관리'} direction = {"join"}/>
                        <HeaderBtn children={'로그인'} direction = {"login"}/>
                        <HeaderBtn children={'마이페이지'} direction = {"mypage"}/>
                    </div>
                </ContentsWrap>
            </HeaderWrapper>


    )
}

export default Header ;