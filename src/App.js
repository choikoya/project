import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import './style.css';
import React, { useState } from 'react';

// import { MainHeader } from './mainHeader';
import { Header } from './header';

import Footer from './footer';
import SignUp from './signUp';
import Login from './logIn';

import Home from './home';
import About from './about';
import ImageSearch from './imgSearch';
import Search from './search';
import KakaoMap from './map';
import MyPage from './myPage';
import BoardList from './board/boardList';



// function HeaderSwitcher() {
//   const location = useLocation();
//   const isHomePage = location.pathname === '/';

//   return isHomePage ? <MainHeader /> : <Header />;


// }




function App() {
  const [favorites, setFavorites] = useState([]);

  const handleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.RCP_NM === item.RCP_NM);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.RCP_NM !== item.RCP_NM);
      } else {
        return [...prevFavorites, item];
      }
    });
  };

  return (
    <BrowserRouter>
      <div className="App">
        {/* <HeaderSwitcher /> */}
        <Header></Header>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/" element={<Home />} />
          <Route path="/imgSearch" element={<ImageSearch />} />
          <Route path="/search" element={<Search onFavoite={handleFavorite} />} />
          {/* <Route path="/board" element={<Board />} /> */}
          <Route path="/map" element={<KakaoMap />} />
          <Route path="/mypage" element={<MyPage favorites={favorites} />} />
          <Route path="/board" element={<BoardList />} />





        </Routes>
        <Footer />

      </div>
    </BrowserRouter>
  );
}




export default App;
