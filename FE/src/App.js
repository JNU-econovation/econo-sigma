
import Category from "./components/common/Category";
import SearchBar from "./components/common/home/SearchBar";
import Detail from "./components/common/Detail";
import BookList from "./components/common/home/BookList";
import Header from "../src/components/common/header/header"
import Main from "../src/pages/main"

function App() {
  return (
    <div className="App">
      <Header/>
      <Category/>
      <Main/>
      
      {/*<SearchBar />*/}
      {/*<BookList img="" title="book" writer="작가" publisher="출판사"/>*/}
    </div>
  
  );
}

export default App;
