import styled from "styled-components";
import { React, useState } from "react";


const StyledButton = styled.button`
    cursor: pointer;
    font-family: 'NanumSquareOTF', sans-serif;
    padding: 0.6em 1.5em;
    font-size: 0.8em;
    font-weight : 1000;
    border: none;
    border-radius : 2em;
    color: white;
    background: ${props => props.isAvailable ? '#FFA53F' : '#6A67E0'};
    
    `;


const Button = ({ available, bookDetailId }) => {
    const [isAvailable, setAvailable] = useState(available)

    const postAvailable = () => {

        setAvailable(!isAvailable)

        if (isAvailable) {
            const requestBody = {
                "status": 200,
                "message": "도서 대출 성공",
                "data": {
                    "borrowInfos": [
                        {
                            bookDetailId,
                            isAvailable
                        }
                    ]
                }
            };
            console.log(requestBody)
    
            // axios.post('api주소', requestBody)
            //     .then(response => {
            //         console.log(response.data);
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     });
        }
        else {
            const requestBody = {
                "status": 200,
                "message": "도서 반납 성공",
                "data": {
                    "borrowInfos": [
                        {
                            bookDetailId,
                            isAvailable
                        }
                    ]
                }
            };
            console.log(requestBody)
    
        //     axios.post('api주소', requestBody)
        //         .then(response => {
        //             console.log(response.data);
        //         })
        //         .catch(error => {
        //             console.error(error);
        //         });
        }
    }

    return (
        <StyledButton isAvailable= {isAvailable} onClick={postAvailable}>
            {isAvailable ? '대출' : '반납'}
        </StyledButton>
    )
}

export default Button;