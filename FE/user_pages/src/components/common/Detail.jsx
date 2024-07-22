import React, { useEffect, useState } from "react";
import styled from "styled-components"
import { useParams } from "react-router-dom";
import Loading from "./Loading.jsx";

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Img = styled.img`
    background-color: aliceblue;
    box-shadow: 0.4em 0.5em 0.5em 0em rgba(0,0,0,0.25), 0em 0.313em 0.875em 0em rgba(0,0,0,0.18);
    width: 12.188em;
    height: 14.25em;
    margin-right: 8.938em;
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
   width: 40.5em;
   background: linear-gradient(to right,#FB8500,#4D4ABF);
    
`;
const Script = styled.div``;

const Content = ({img,title, writer,publisher,date,script}) => {
    return(
        <div>
            <Img src={img}></Img>
            <div style={{display: "inline-flex", flexDirection: "column"}}>
                <div style={{ display: "inline-flex", alignItems: "baseline"}}>
                    <Title>{title}</Title>
                    <Writer>{writer}</Writer> 
                    <span style={{ 
                        fontFamily: 'NanumSquareOTF, sans-serif', fontWeight: '300',fontSize: '0.938em', 
                        marginLeft: '0.5em', marginRight:'0.5em'
                        }}>/</span> 
                    <Publisher>{publisher}</Publisher>
                    <span style={{ 
                        fontFamily: 'NanumSquareOTF, sans-serif', fontWeight: '300',fontSize: '0.938em', 
                        marginLeft: '0.5em', marginRight:'0.5em'}}>/</span> 
                    <Date>{date}</Date>
                </div>
                <div style={{display:"inline-block"}}>
                    <Line></Line>
                    <Script>{script}</Script>
                </div>
            </div>
        </div>
    );
}

function Detail (book){
    const detailBook = book.book.bookInfo
    console.log(detailBook)

    
    const [loading, setLoading] = useState(false);
    // const [book, setBook] = useState([]);
    // const getBook = async () => {
    //     const json = await (await fetch(`url/book_id=${book_id}`)).json();
    //     setBook(json.data.book);
    //     setLoading(false);
    // };

    // useEffect(() => {
    //     getBook()
    // },[]);
    
    
    return(
        <Container>
            {loading ?
                <Loading/> :
                <Content
                // img={detailBook.img} //추후 백엔드 변수명으로 바꾸기
                title={detailBook.title}
                writer={detailBook.author}
                publisher={detailBook.publisher}
                date={detailBook.publishYear}
                script={detailBook.script} //추후 백엔드 변수명으로 바꾸기
                />}
        </Container>
    )
}
export default Detail;