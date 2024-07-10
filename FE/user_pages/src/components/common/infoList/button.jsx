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


        if (isAvailable) {
            if (window.confirm("도서를 대출하시겠습니까?")) {
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
                setAvailable(!isAvailable)

        
                // axios.post('api주소', requestBody)
                //     .then(response => {
                //         console.log(response.data);
                //     })
                //     .catch(error => {
                //         console.error(error);
                //     });
            }

        }
        else {
            if (window.confirm("도서를 반납하시겠습니까?")){
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
                setAvailable(!isAvailable)

        
            //     axios.post('api주소', requestBody)
            //         .then(response => {
            //             console.log(response.data);
            //         })
            //         .catch(error => {
            //             console.error(error);
            //         });
            }
            }
          
    }

    return (
        <StyledButton isAvailable= {isAvailable} onClick={postAvailable}>
            {isAvailable ? '대출' : '반납'}
        </StyledButton>
    )
}

export default Button;