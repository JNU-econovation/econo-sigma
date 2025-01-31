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
    return await fetchBooks(location);
  } catch (error) {
    console.error("Error in getBook:", error);
    throw error;
  }
};
