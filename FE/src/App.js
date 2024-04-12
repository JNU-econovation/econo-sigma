import Category from "../src/components/Category";
import SearchBar from "../src/components/SearchBar";
import Detail from "../src/components/Detail";
import BookList from "./components/BookList";

function App() {
  return (
    <div className="App">
      
      <Category/>
      <SearchBar/>
      <Detail/>
      
      {/*<SearchBar />*/}
      {/*<BookList img="" title="book" writer="작가" publisher="출판사"/>*/}
  

    </div>
  );
}

export default App;
