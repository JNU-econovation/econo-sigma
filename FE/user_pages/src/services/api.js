import { useSearchParams } from "react-router-dom";
const API_URL = "http://localhost:3001/api";

export const fetchBooks = async (params) => {
  const response = await fetch(`${API_URL}${params}`, { method: "GET" });
  if (!response.ok) {
    throw new Error("Fetching books failed");
  }
  return await response.json();
};

export const getBook = async (location) => {
  try {
    console.log("now");
    return await fetchBooks(location);
  } catch (error) {
    console.error("Error in getBook:", error);
    throw error;
  }
};

export const getLocation = (searchParams) => {
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
