import { useState } from 'react';
import './signUp.css';

function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [emailChecked, setEmailChecked] = useState(false);

    // 이메일과 비밀번호의 유효성을 검사하는 정규 표현식
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    // 이메일 유효성 검사
    const validateEmail = (email) => {
        return emailRegex.test(email);
    };

    // 비밀번호 유효성 검사
    const validatePassword = (password) => {
        return passwordRegex.test(password);
    };

    // 이메일 중복 확인 (모의 API 호출)
    const checkEmailExists = async (email) => {
        // 실제 API 호출로 변경해야 합니다.
        const mockExistingEmails = ['test@example.com', 'user@example.com'];
        return mockExistingEmails.includes(email);
    };

    // 이메일 입력 처리
    const handleEmailChange = async (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (emailChecked) {
            if (!validateEmail(newEmail)) {
                setEmailError('유효하지 않은 이메일 주소입니다.');
            } else {
                // 이메일 유효성 검사 통과 후 중복 확인
                const exists = await checkEmailExists(newEmail);
                if (exists) {
                    setEmailError('이메일이 이미 사용 중입니다.');
                } else {
                    setEmailError('');
                }
            }
        }
    };

    // 이메일 중복 확인 버튼 클릭 처리
    const checkEmail = async () => {
        if (validateEmail(email)) {
            const exists = await checkEmailExists(email);
            if (exists) {
                setEmailError('이메일이 이미 사용 중입니다.');
            } else {
                setEmailError('');
                setEmailChecked(true);
            }
        } else {
            setEmailError('유효하지 않은 이메일 주소입니다.');
        }
    };

    // 폼 제출 처리
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !name || !password || !confirmPassword) {
            setGeneralError('모든 필드를 입력해 주세요.');
            return;
        }
        if (!validateEmail(email)) {
            setEmailError('유효하지 않은 이메일 주소입니다.');
            return;
        }
        if (!validatePassword(password)) {
            setPasswordError('비밀번호는 8~20자, 영문, 숫자, 특수문자를 포함해야 합니다.');
            return;
        }
        if (password !== confirmPassword) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
            return;
        }
        // 회원가입 로직을 여기에 추가
        console.log('회원가입:', { email, name, password });
    };

    // 폼 취소 처리
    const handleCancel = () => {
        setEmail('');
        setName('');
        setPassword('');
        setConfirmPassword('');
        setEmailError('');
        setPasswordError('');
        setGeneralError('');
        setEmailChecked(false);
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>회원가입 (Sign Up)</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">이메일 (Email)</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="이메일을 입력해 주세요 (e.g., example@domain.com)"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        <button type="button" onClick={checkEmail} className="check-email-btn">
                            이메일 확인 (Check Email)
                        </button>
                        {emailError && <p className="error-message">{emailError}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">이름 (Name)</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="이름을 입력해 주세요"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호 (Password)</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="비밀번호를 입력해 주세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">비밀번호 확인 (Confirm Password)</label>
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="비밀번호를 다시 입력해 주세요"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {passwordError && <p className="error-message">{passwordError}</p>}
                    </div>
                    {generalError && <p className="error-message">{generalError}</p>}
                    <div className="form-buttons">
                        <button type="submit" className="submit-btn">가입 완료 (Sign Up)</button>
                        <button type="button" onClick={handleCancel} className="cancel-btn">가입 취소 (Cancel)</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;