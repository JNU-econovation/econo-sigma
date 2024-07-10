import React, { useEffect, useState } from "react";
import styled from "styled-components"
import { useParams } from "react-router-dom";
import Loading from "./Loading.jsx";


const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    /* background-color: aqua; */
`;

const Img = styled.img`
    background-color: aliceblue;
    box-shadow: 0.4em 0.5em 0.5em 0em rgba(0,0,0,0.25), 0em 0.313em 0.875em 0em rgba(0,0,0,0.18);
    width: 12.188em;
    height: 14.25em;
    margin-right: 4em;
    vertical-align: top;
`;

const Title = styled.span`
    background-color: lemonchiffon;
    font-family: 'NanumSquareOTF', sans-serif;
    font-weight: 800;
    font-size: 2.188em;
    vertical-align: top;
    margin-right: 1em;
    `;

const Writer = styled.span`
    font-family: 'NanumSquareOTF', sans-serif;
    font-weight: 300;
    font-size: 0.938em;
    background-color: beige;
`;
const Publisher = styled.span`
    font-family: 'NanumSquareOTF', sans-serif;
    font-weight: 300;
    font-size: 0.938em;
    background-color: beige;
    `;

const Date = styled.span`
    font-family: 'NanumSquareOTF', sans-serif;
    font-weight: 300;
    font-size: 0.938em;
    background-color: beige;
`;

const Line = styled.div`
   display: inline-block;
   height: 0.063em;
   width: 100%;
   background: linear-gradient(to right,#FB8500,#4D4ABF);
    
`;
const StyledDiv = styled.div`
    width: 100%;
    display: flex;

    .details {
        display: inline-block;
        width : 100%

    }



`;
const Script = styled.div`
    float: left;
`;

const Content = ({ img, title, writer, publisher, date, script }) => {


    return (
        <StyledDiv >
            <Img src={img}></Img>
            <div className="details">
                <div  style={{ display: "inline-flex", alignItems: "baseline", width: '100%'}}>
                    <Title>{title}</Title>
                    <Writer>{writer}</Writer>
                    <span style={{
                        fontFamily: 'NanumSquareOTF, sans-serif', fontWeight: '300', fontSize: '0.938em',
                        marginLeft: '0.5em', marginRight: '0.5em'
                    }}>/</span>
                    <Publisher>{publisher}</Publisher>
                    <span style={{
                        fontFamily: 'NanumSquareOTF, sans-serif', fontWeight: '300', fontSize: '0.938em',
                        marginLeft: '0.5em', marginRight: '0.5em'
                    }}>/</span>
                    <Date>{date}</Date>
                </div>
                <div style={{width: '100%', float: 'left'}}>
                    <Line></Line>
                    <Script>{script}</Script>
                </div>
            </div>
        </StyledDiv>
    );
}

function Detail() {

    return (
        <Container>
            <Content
                //key??
                img=""
                title="book"
                writer="writer"
                publisher="publisher"
                date="date"
                script="script"
            />
        </Container>
    )

}
export default Detail;