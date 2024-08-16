
import { useState, useEffect } from 'react';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    // 페이지 로드 시 로그인 상태 확인
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async(e) => { //async로 업데이트
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    // 패스워드 유효성 검사
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  // if (!password || !passwordRegex.test(password)) {
  //   setError('Password must be at least 8 characters long and include uppercase letters, numbers, and special characters');
  //   return;
  // }
    // 로그인 로직을 여기에 추가
  //   console.log('Logging in with:', { id, password });
  // };

  try {
    //백엔드 호출 시작
    const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

    const response = await fetch('http://192.168.0.130:8080/login', {
      method: 'POST',
      body: formData,// 요청 본문에 id와 password를 JSON 형식으로 전달
    });

    if (!response.ok) {
      // 응답이 OK가 아닌 경우 오류 처리
      const errorData = await response.json();
      
      
      setError(errorData.message || 'Login failed');
      return;
    }

    
    const data = await response.json();
   console.log(data);

    if (response.ok) {
      const token = data.token;
      console.log(token);
      // console.log('Login successful:', data);
      // 로그인 성공 처리 - 예: 토큰 저장 및 페이지 이동
      sessionStorage.setItem('token', token);
      window.location.href = '/';
    } 
  } catch (error) {
    console.error('Error during login:', error);
    setError('An unexpected error occurred');
  }
};


  const handleSocialLogin = (provider) => {
    // 소셜 로그인 로직을 여기에 추가
    console.log('Logging in with:', provider);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">Id</label>
          <input
            type="text"
            id="id"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>

      <div className="social-login">
        <p>Or log in with</p>
        <button onClick={() => handleSocialLogin('Google')} className="social-button google">Google</button>
        <button onClick={() => handleSocialLogin('Naver')} className="social-button naver">Naver</button>
        <button onClick={() => handleSocialLogin('Kakao')} className="social-button kakao">Kakao</button>
      </div>
    </div>
  );
}

export default Login;