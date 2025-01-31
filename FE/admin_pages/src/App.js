import { Routes, Route, Router } from 'react-router-dom';
import { AuthProvider } from './components/common/login/AuthProvider.jsx';
import './App.css';

import { React} from 'react';
import { useLocation } from 'react-router-dom';

import Header from './components/common/header/header.jsx';
import Category from './components/common/Category.jsx';
import BookList from './pages/BookList.jsx';
import UserList from './pages/UserList.jsx';
import BookApporovePage from './pages/BookApporovePage.jsx';
import RegisterMember from './pages/RegisterMember.jsx';
import Form from './components/common/Form.jsx';
import Login from './pages/login.jsx';


function App() {
  const currentLocation = useLocation();



  return (

    <div className="App">



      <AuthProvider>
        {currentLocation.pathname !== '/admin/login' && <Header />}
        {currentLocation.pathname !== '/admin/login' && <Category />}
        <Routes>
          <Route path="/admin/books" element={<BookList />} />
          <Route path="/admin/books/approve" element={<BookApporovePage />} />
          <Route path="/admin/users" element={<UserList />} />

          <Route path="/admin/users/register" element={<RegisterMember />} />
          <Route path="/books" element={<Form />} />
          <Route path="/admin/login" element={<Login />} />

        </Routes>
      </AuthProvider>






    </div>


  );
}



export default App;
