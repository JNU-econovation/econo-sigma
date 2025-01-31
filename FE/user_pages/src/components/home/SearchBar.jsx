import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as SearchButton } from "../../assets/searchButton.svg";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67vw;
  height: 3.3em;
  border-radius: 3em;
  background-color: #fff;
  border: 0.15em solid transparent;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(to right, #4d4abf, #fb8500);
  border-image-slice: 1;
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin-bottom: 5em;
`;
const SearchInput = styled.input`
  width: 90%;
  font-size: 1.3em;
  margin-left: 0.7em;
  background: transparent;
  border: none;
  -webkit-appearance: none;
  &:focus {
    outline: none;
    cursor: text;
  }
`;
const SearchBtn = styled(SearchButton)`
  width: 2.5em;
  height: 2.5em;
  cursor: pointer;
`;

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const onChange = (e) => setKeyword(e.target.value);

  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   const page = searchParams.get("page");
  //   const categoryParam = searchParams.get("categoryName");
  //   const keywordParam = searchParams.get("keyword");
  // }, [searchParams]);

  const getFilteredBook = async () => {
    searchParams.set("keyword", keyword);
    searchParams.set("page", 0);
    setSearchParams(searchParams);
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      getFilteredBook();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "3em",
        marginLeft: "5em",
      }}
    >
      <div>
        <SearchBox>
          <SearchBtn type="button" onClick={getFilteredBook} />
          <SearchInput
            type="text"
            value={keyword}
            onChange={onChange}
            onKeyUp={onKeyUp}
          ></SearchInput>
        </SearchBox>
      </div>
    </div>
  );
}

export default SearchBar;
