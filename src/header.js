//HTML 헤더 부분을 리액트 컴포넌트로 변환

import { Link } from 'react-router-dom';
import './header.css'; // 헤더 스타일이 필요할 경우

function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64">
      <div className="hidden md:flex justify-between items-center py-2 border-b text-sm py-3"
        style={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}>
        <div>
          <ul className="flex text-white">
            <li>
              <div className="flex items-center">


                <span className="ml-2"></span>
              </div>
            </li>
            <li className="ml-6">
              <div className="flex items-center">


                <span className="ml-2"></span>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <ul className="flex justify-end text-white">
            <li>
              <a href="#" target="_blank" title="">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path
                    d="M20,3H4C3.447,3,3,3.448,3,4v16c0,0.552,0.447,1,1,1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325,1.42-3.592,3.5-3.592	c0.699-0.002,1.399,0.034,2.095,0.107v2.42h-1.435c-1.128,0-1.348,0.538-1.348,1.325v1.735h2.697l-0.35,2.725h-2.348V21H20	c0.553,0,1-0.448,1-1V4C21,3.448,20.553,3,20,3z">
                  </path>
                </svg> */}
                <Link className="py-2 inline-block md:text-white md:px-2 font-semibold" to="/login">로그인</Link>
             
              </a>
            </li>

            <li className="ml-6">
              <a href="#" target="_blank" title="">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path
                    d="M19.633,7.997c0.013,0.175,0.013,0.349,0.013,0.523c0,5.325-4.053,11.461-11.46,11.461c-2.282,0-4.402-0.661-6.186-1.809	c0.324,0.037,0.636,0.05,0.973,0.05c1.883,0,3.616-0.636,5.001-1.721c-1.771-0.037-3.255-1.197-3.767-2.793	c0.249,0.037,0.499,0.062,0.761,0.062c0.361,0,0.724-0.05,1.061-0.137c-1.847-0.374-3.23-1.995-3.23-3.953v-0.05	c0.537,0.299,1.16,0.486,1.82,0.511C3.534,9.419,2.823,8.184,2.823,6.787c0-0.748,0.199-1.434,0.548-2.032	c1.983,2.443,4.964,4.04,8.306,4.215c-0.062-0.3-0.1-0.611-0.1-0.923c0-2.22,1.796-4.028,4.028-4.028	c1.16,0,2.207,0.486,2.943,1.272c0.91-0.175,1.782-0.512,2.556-0.973c-0.299,0.935-0.936,1.721-1.771,2.22	c0.811-0.088,1.597-0.312,2.319-0.624C21.104,6.712,20.419,7.423,19.633,7.997z">
                  </path>
                </svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                
                
              </a>
            </li>

            <li className="ml-6">
              <a href="#" target="_blank" title="">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path
                    d="M20.947,8.305c-0.011-0.757-0.151-1.508-0.419-2.216c-0.469-1.209-1.424-2.165-2.633-2.633 c-0.699-0.263-1.438-0.404-2.186-0.42C14.747,2.993,14.442,2.981,12,2.981s-2.755,0-3.71,0.055 c-0.747,0.016-1.486,0.157-2.185,0.42C4.896,3.924,3.94,4.88,3.472,6.089C3.209,6.788,3.067,7.527,3.053,8.274 c-0.043,0.963-0.056,1.268-0.056,3.71s0,2.754,0.056,3.71c0.015,0.748,0.156,1.486,0.419,2.187 c0.469,1.208,1.424,2.164,2.634,2.632c0.696,0.272,1.435,0.426,2.185,0.45c0.963,0.043,1.268,0.056,3.71,0.056s2.755,0,3.71-0.056 c0.747-0.015,1.486-0.156,2.186-0.419c1.209-0.469,2.164-1.425,2.633-2.633c0.263-0.7,0.404-1.438,0.419-2.187 c0.043-0.962,0.056-1.267,0.056-3.71C21.003,9.572,21.003,9.262,20.947,8.305z M11.994,16.602c-2.554,0-4.623-2.069-4.623-4.623 s2.069-4.623,4.623-4.623c2.552,0,4.623,2.069,4.623,4.623S14.546,16.602,11.994,16.602z M16.801,8.263 c-0.597,0-1.078-0.482-1.078-1.078s0.481-1.078,1.078-1.078c0.595,0,1.077,0.482,1.077,1.078S17.396,8.263,16.801,8.263z">
                  </path>
                  <circle cx="11.994" cy="11.979" r="3.003"></circle>
                </svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 48 48">
                  <linearGradient id="_rH8YBooyc-uwdwnRIye-a_esc0dlSS0IwW_gr1" x1="26" x2="26" y1="11.848" y2="61.644" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fed100"></stop><stop offset="1" stop-color="#e38101"></stop></linearGradient><path fill="url(#_rH8YBooyc-uwdwnRIye-a_esc0dlSS0IwW_gr1)" d="M35,42H13c-3.866,0-7-3.134-7-7V13c0-3.866,3.134-7,7-7h22c3.866,0,7,3.134,7,7v22	C42,38.866,38.866,42,35,42z"></path><path d="M24,12c7.732,0,14,5.033,14,11.242s-6.268,11.242-14,11.242c-1.012,0-1.997-0.091-2.949-0.255l-5.615,3.713 C15.377,37.982,15.314,38,15.252,38c-0.206,0-0.389-0.198-0.32-0.427l1.479-4.892C12.557,30.679,10,27.203,10,23.242 C10,17.033,16.268,12,24,12 M24,11c-8.271,0-15,5.492-15,12.242c0,3.964,2.31,7.622,6.221,9.922l-1.246,4.119 c-0.123,0.406-0.049,0.835,0.203,1.174C14.43,38.797,14.831,39,15.252,39c0.261,0,0.516-0.077,0.736-0.223l5.289-3.498 c0.906,0.136,1.82,0.205,2.723,0.205c8.271,0,15-5.492,15-12.242C39,16.492,32.271,11,24,11L24,11z" opacity=".05"></path><path d="M24,12c7.732,0,14,5.033,14,11.242s-6.268,11.242-14,11.242c-1.012,0-1.997-0.091-2.949-0.255l-5.615,3.713 C15.377,37.982,15.314,38,15.252,38c-0.206,0-0.389-0.198-0.32-0.427l1.479-4.892C12.557,30.679,10,27.203,10,23.242 C10,17.033,16.268,12,24,12 M24,11.5c-7.995,0-14.5,5.268-14.5,11.742c0,3.896,2.352,7.49,6.315,9.686l-1.361,4.5 c-0.077,0.254-0.031,0.521,0.125,0.732c0.158,0.213,0.409,0.34,0.673,0.34c0.163,0,0.322-0.048,0.46-0.14l5.451-3.605 c0.944,0.152,1.897,0.229,2.837,0.229c7.995,0,14.5-5.268,14.5-11.742C38.5,16.768,31.995,11.5,24,11.5L24,11.5z" opacity=".07"></path><path fill="#343434" d="M24,12c-7.732,0-14,5.033-14,11.242c0,3.961,2.557,7.436,6.412,9.439l-1.479,4.892	c-0.09,0.297,0.244,0.542,0.504,0.37l5.615-3.713c0.951,0.164,1.937,0.255,2.949,0.255c7.732,0,14-5.033,14-11.242S31.732,12,24,12z"></path><linearGradient id="_rH8YBooyc-uwdwnRIye-b_esc0dlSS0IwW_gr2" x1="16.364" x2="16.364" y1="11.848" y2="61.644" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fed100"></stop><stop offset="1" stop-color="#e38101"></stop></linearGradient><path fill="url(#_rH8YBooyc-uwdwnRIye-b_esc0dlSS0IwW_gr2)" d="M18.91,20.636 c0-0.351-0.285-0.636-0.636-0.636h-3.818c-0.351,0-0.636,0.285-0.636,0.636c0,0.351,0.285,0.636,0.636,0.636h1.273v5.091 c0,0.351,0.285,0.636,0.636,0.636c0.351,0,0.636-0.285,0.636-0.636v-5.091h1.273C18.625,21.273,18.91,20.988,18.91,20.636z"></path><linearGradient id="_rH8YBooyc-uwdwnRIye-c_esc0dlSS0IwW_gr3" x1="31.636" x2="31.636" y1="11.848" y2="61.644" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fed100"></stop><stop offset="1" stop-color="#e38101"></stop></linearGradient><path fill="url(#_rH8YBooyc-uwdwnRIye-c_esc0dlSS0IwW_gr3)" d="M34.045,25.97l-2.359-3.002 c-0.008-0.011-0.021-0.015-0.03-0.025l1.857-1.857c0.249-0.248,0.249-0.651,0-0.9c-0.248-0.249-0.651-0.249-0.9,0l-2.249,2.249 v-1.799c0-0.351-0.285-0.636-0.636-0.636s-0.636,0.285-0.636,0.636v5.727c0,0.351,0.285,0.636,0.636,0.636s0.636-0.285,0.636-0.636 v-2.135c0.007-0.006,0.016-0.008,0.022-0.015l0.369-0.369l2.29,2.913c0.217,0.276,0.617,0.324,0.893,0.107 S34.262,26.246,34.045,25.97z"></path><linearGradient id="_rH8YBooyc-uwdwnRIye-d_esc0dlSS0IwW_gr4" x1="26.545" x2="26.545" y1="11.848" y2="61.644" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fed100"></stop><stop offset="1" stop-color="#e38101"></stop></linearGradient><path fill="url(#_rH8YBooyc-uwdwnRIye-d_esc0dlSS0IwW_gr4)" d="M27.818,25.727h-1.909v-5.09 c0-0.351-0.285-0.636-0.636-0.636s-0.636,0.285-0.636,0.636v5.727c0,0.351,0.285,0.636,0.636,0.636h2.545 c0.351,0,0.636-0.285,0.636-0.636C28.454,26.012,28.169,25.727,27.818,25.727z"></path><linearGradient id="_rH8YBooyc-uwdwnRIye-e_esc0dlSS0IwW_gr5" x1="21.136" x2="21.136" y1="11.848" y2="61.644" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fed100"></stop><stop offset="1" stop-color="#e38101"></stop></linearGradient><path fill="url(#_rH8YBooyc-uwdwnRIye-e_esc0dlSS0IwW_gr5)" d="M21.908,20.409 c-0.092-0.241-0.316-0.389-0.559-0.4c-0.071-0.003-0.344-0.002-0.408-0.001c-0.249,0.004-0.482,0.153-0.576,0.401l-2.05,5.727 c-0.126,0.328,0.038,0.696,0.367,0.822c0.328,0.126,0.696-0.038,0.822-0.367l0.309-0.864h2.647l0.309,0.864 c0.126,0.328,0.494,0.492,0.822,0.367c0.328-0.125,0.492-0.494,0.366-0.822L21.908,20.409z M20.269,24.454l0.868-2.426l0.868,2.426 H20.269z"></path>
                </svg>
              </a>
            </li>

            <li className="ml-6">
              <a href="#" target="_blank" title="">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path
                    d="M21.593,7.203c-0.23-0.858-0.905-1.535-1.762-1.766C18.265,5.007,12,5,12,5S5.736,4.993,4.169,5.404	c-0.84,0.229-1.534,0.921-1.766,1.778c-0.413,1.566-0.417,4.814-0.417,4.814s-0.004,3.264,0.406,4.814	c0.23,0.857,0.905,1.534,1.763,1.765c1.582,0.43,7.83,0.437,7.83,0.437s6.265,0.007,7.831-0.403c0.856-0.23,1.534-0.906,1.767-1.763	C21.997,15.281,22,12.034,22,12.034S22.02,8.769,21.593,7.203z M9.996,15.005l0.005-6l5.207,3.005L9.996,15.005z">
                  </path>
                </svg> */}
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABIUlEQVR4nL3Vz0rDQBAG8BwF/xUvvRSy86VQKPQJPAiCaAUVfCGvzUxCEfTmqZ59Cd/BkygiSl9CrUyw0K6SVpzxg70EZn7s7pBNkv8MBH1iGkwXSvQW1WScnczVCPp1wDUEk+kipofuRXetDiCmm9ka7bE0UCFCQ1cAgveQhx1PYALGYyfvrPsBUiGX3sBHKMK+HyDVVL2kw7RhCdxCMI52cmUGaDEJHX3bTY5DMyDR74xR1OS1Vba27IABNonpOTqqkRmgoYL2dJKiZqdmgEYvOGo2/hoEG6B93t4A46lulP8EaCDY/eGo7ACN/jZcgaY0V4np3g3QgLENxpsboNHHyBVIz9IVYrr7DTD36IciHNcBVU2J3mxNxtnBohrTfAKxD9qnXtnlgAAAAABJRU5ErkJggg=="></img>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between py-6">
        <div className="w-1/2 md:w-auto">
          <Link to="/" className="text-white font-bold text-2xl">
            RecipeQuest
          </Link>
        </div>

        <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block"><svg className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg></label>

        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div className="hidden md:block w-full md:w-auto" id="menu">
          <nav
            className="w-full bg-white md:bg-transparent rounded shadow-lg px-6 py-4 mt-4 text-center md:p-0 md:mt-0 md:shadow-none">
            <ul className="md:flex items-center">
              {/* <li className="py-2"><Link className="inline-block md:text-white md:hidden lg:block font-semibold" to="/about">About Us</Link></li> */}
              <li className="md:ml-4"><Link className="py-2 inline-block md:text-white md:px-2 font-semibold" to="/search">레시피 검색</Link></li>
              <li className="md:ml-4"><Link className="py-2 inline-block md:text-white md:px-2 font-semibold" to="/board">게시판</Link></li>
              <li className="md:ml-4"><Link className="py-2 inline-block md:text-white md:px-2 font-semibold" to="/map">맛집지도</Link></li>
              <li className="md:ml-4 md:hidden lg:block"><Link className="py-2 inline-block md:text-white md:px-2 font-semibold" to="/myPage">My Page</Link></li>
              <li className="md:ml-6 mt-3 md:mt-0">
                <Link className="inline-block font-semibold px-4 py-2 text-white bg-blue-600 md:bg-transparent md:text-white border border-white rounded"
                  to="/signUp">회원가입</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
export default Header;
