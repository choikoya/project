
import { useState } from 'react';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // 로그인 로직을 여기에 추가
    console.log('Logging in with:', { email, password });
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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