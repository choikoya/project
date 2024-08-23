import { useState, useEffect } from 'react';
import './signUp.css';

function SignUp() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [idError, setIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [idChecked, setIdChecked] = useState(false);



    // ID 유효성 검사 (예시로 ID는 최소 5자, 최대 15자 길이만 허용)
    const idRegex = /^[a-zA-Z0-9._-]{5,15}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    // ID 유효성 검사
    const validateId = (id) => {
        return idRegex.test(id);
    };

    // 비밀번호 유효성 검사
    const validatePassword = (password) => {
        return passwordRegex.test(password);
    };

    // ID 중복 확인 (모의 API 호출)
    const checkIdExists = async (id) => {
        // 실제 API 호출로 변경해야 합니다.
        const response = await fetch(`http://192.168.0.130:8080/register/check-username?username=${id}`)
        const data = await response.json();  
        return data; 
        

    };

    // ID 입력 처리
    const handleIdChange = async (e) => {
        e.preventDefault();
        const newId = e.target.value;
        setId(newId);
        if (idChecked) {
            if (!validateId(newId)) {
                setIdError('유효하지 않은 ID입니다.');
            } else {
                // ID 유효성 검사 통과 후 중복 확인
                const exists = await checkIdExists(newId);
                if (exists) {
                    setIdError('ID가 이미 사용 중입니다.');
                } else {
                    setIdError('');

                   

                }
            }
        }
    };

    // ID 중복 확인 버튼 클릭 처리
    const checkId = async () => {
        if (validateId(id)) {
            const exists = await checkIdExists(id);
            if (exists) {
                setIdError('ID가 이미 사용 중입니다.');
            } else {
                alert("사용가능");
                setIdChecked(true);
            }
        } else {
            setIdError('유효하지 않은 ID입니다.');
        }
    };

    // 폼 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id || !name || !password || !confirmPassword) {
            setGeneralError('모든 필드를 입력해 주세요.');
            return;
        }
        if (!validateId(id)) {
            setIdError('유효하지 않은 ID입니다.');
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

        setPasswordError('');

        try {
            const formData = new FormData();
            formData.append('username', id);
            formData.append('password', password);
            formData.append('alias', name);

            const response = await fetch('http://192.168.0.130:8080/register', {
                method: 'POST',
                
                body: formData,
            });
            alert("가입완료");
            handleCancel();
            window.location.href = '/login';

           
        } catch (error) {
            setGeneralError("오류 발생");
        }
        setGeneralError('');

        
    };

    // 폼 취소 처리
    const handleCancel = () => {
        setId('');
        setName('');
        setPassword('');
        setConfirmPassword('');
        setIdError('');
        setPasswordError('');
        setGeneralError('');
        setIdChecked(false);
    };

    // useEffect(() => {
    //     handleCancel(); // 페이지 로드 시 상태 초기화
    // }, []);

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>회원가입 (Sign Up)</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="id">ID</label>
                        <input
                            type="text"
                            id="id"
                            placeholder="ID를 입력해 주세요 (5~15자, 영문/숫자/특수문자 가능)"
                            value={id}
                            onChange={handleIdChange}
                            required
                        />
                        <button type="button" onClick={checkId} className="check-id-btn">
                            ID 확인 (Check ID)
                        </button>
                        {idError && <p className="error-message">{idError}</p>}
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
