import './App.css';
import React from 'react';
import Header from './header';
import Main from './main';
import About from './about';
import Test from './test';
import Blog from './blog';
import Cta from './cta';
import Footer from './footer';
import Login from './logIn';
import SignUp from './signUp';


function App() {
  return (
    <div className="App">
      {/* <Header />
      <Main />
      <About />
      <Test />
      <Blog />
      <Cta />
      <Footer /> */}
      {/* <Login /> */}
      <SignUp />
    </div>
  );
}

export default App;
