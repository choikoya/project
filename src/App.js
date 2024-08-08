import './App.css';
import React from 'react';
import Header from './header';
import Footer from './footer';
import Login from './logIn';
import SignUp from './signUp';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './home'; 
import Search from './search';
import RecipeInfo from './recipeInfo';
import './style.css';


function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipeInfo" element={<RecipeInfo />} />
        </Routes>
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
