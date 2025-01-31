import SearchBar from "../components/home/SearchBar";
import styled from "styled-components";
import Loading from "../components/common/Loading";
import { React, useState, useEffect } from "react";
import BookList from "../components/home/BookList";
import Pagination from "../components/common/Pagination";
import { getBook } from "../services/api";
import { useLocation, useSearchParams } from "react-router-dom";

const Books = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 5em;
  margin: auto;
  margin-bottom: 3em;
`;

const StyledPage = styled.div`
  padding-bottom: 3em;
  /* justify-content: center; */

  .contents {
    padding-top: 9em;
    margin-left: 15em;
  }
  .infotable {
    margin-top: 3em;
  }
  .message {
    margin-top: 3em;
    margin-left: 5%;
    display: flex;
    justify-content: center;
  }
`;

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState([]);

  const getLocation = () => {
    const keyword = searchParams.get("keyword");
    const category = searchParams.get("categoryName");
    const page = searchParams.get("page");

    const categoryParam = category ? `categoryName=${category}` : "";
    const keywordParam = keyword ? `&keyword=${keyword}` : "";
    const pageParam = page ? `&page=${page}` : "&page=0";

    let apiUrl = "";

    if (category && keyword) {
      apiUrl = `/books/category/search?${categoryParam}${keywordParam}${pageParam}`;
    } else if (category) {
      apiUrl = `/books/category?${categoryParam}${pageParam}`;
    } else if (keyword) {
      apiUrl = `/books/all/search?${keywordParam}${pageParam}`;
    } else if (page) {
      apiUrl = `/books/all?${pageParam}`;
    } else {
      apiUrl = `/books/all`;
    }

    return apiUrl;
  };

  useEffect(() => {
    const location = getLocation();

    const fetchData = async () => {
      setLoading(true);
      try {
        const json = await getBook(location);
        setBook(json);
      } catch (error) {
        console.error("Fetching books failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <StyledPage>
      <div className="contents">
        {loading ? <Loading /> : <SearchBar />}

        {loading ? (
          <Loading />
        ) : book.data.bookInfos.length > 0 ? (
          <>
            <Books>
              {book.data.bookInfos.map((item) => (
                <BookList
                  data={item}
                  key={item.id}
                  img={item.imageURL}
                  title={item.title}
                  author={item.author}
                  publisher={item.publisher}
                />
              ))}
            </Books>
            <Pagination response={book} />
          </>
        ) : (
          <div className="message">해당되는 도서가 존재하지 않습니다.</div>
        )}
      </div>
    </StyledPage>
  );
};

export default Main;
