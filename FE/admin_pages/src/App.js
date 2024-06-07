import { Routes, Route, Router, useLocation} from 'react-router-dom';
import styled from "styled-components"
import InfoTable from './components/common/header/table/userTable.jsx';
import './App.css';

import {React, useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';

import Header from './components/common/header/header.jsx';



function App() {



 

  
  const currentLocation = useLocation();
  const params = useParams();

  return (
    
    <div className="App">
      {currentLocation.pathname !== '/users/login' && <Header />}
    </div>


  );
}



export default App;
