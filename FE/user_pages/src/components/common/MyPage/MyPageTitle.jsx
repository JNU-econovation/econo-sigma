import styled from "styled-components"


const StyledTitle = styled.div`
    margin-top: 1.5rem;
    .userInfo { 
    display: flex;  
    justify-content: left;
    align-items: flex-end;
    gap: 0.5em;
    }


    .grade {
        font-weight: 700;
        padding-bottom: 0.1em;

    }
    .name {
        font-size: 1.4em;
        font-weight: 700;
    }

    .loginId {
        font-size: 1.3em;
        font-weight: 700;
        padding-bottom: 0.2em;
        color: #A8A8A8;
    }
`
const MyPageTitle = ({ userInfo }) => {
    const userInfoData = userInfo.data

    return (
            <StyledTitle>
                <div className="userInfo">
                    <div className="grade">{userInfoData.grade}기</div>
                    <div className="name">{userInfoData.name}</div>
                    <div className="loginId">({userInfoData.loginId})</div>
                </div>

            </StyledTitle>

    )
};

export default MyPageTitle;