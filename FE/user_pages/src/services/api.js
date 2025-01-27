const API_URL = 'http://localhost:3000/api';  

export const fetchBooks = async (params) => {
    console.log(params);
    const response = await fetch(`${API_URL}${params}`, { method: 'GET' });
    console.log(response);
    if (!response.ok) {
        throw new Error('Fetching books failed');
    }
    return await response.json();
};

export const getBook = async (location) => {
    try {
        const apiUrl = location.search.length > 0?`${location.pathname}${location.search}`:`${location.pathname}`;
        return await fetchBooks(apiUrl);
    } catch (error) {
        console.error('Error in getBook:', error);
        throw error;
    }
};