import styled from "styled-components"


const StyledTitle = styled.div`

    display: flex;
    justify-content: left;
    align-items: flex-end;
    gap: 0.5em;
    margin-left: 1.6rem;
    /* background-color: antiquewhite; */
    /* margin-bottom: 2rem; */


    .title {
        font-size: 1.8em;
        font-weight: 700;
    }
    .sub {
        padding-bottom: 0.2em;
    }
`
const Title = ({title, sub}) => {
    return(
        <StyledTitle>
            <div className="title">{title}</div>
            <div className="sub">{sub}</div>
        </StyledTitle>
    )
};

export default Title;