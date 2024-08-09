// Modal.js

import './modal.css'; // 모달 스타일을 위한 CSS 파일



const Modal = ({ isOpen, onClose, imgUrl, title, content, info }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <h2 className="modal-title">{title}</h2>
                <hr className="divider" />
                <div className='modal-body'>
                    <div className="modal-left">
                        <img className="modal-image" src={imgUrl} alt={title} />
                    </div>
                    <div className="modal-right">
                        <div className="modal-ingredients">
                            <h3>재료 정보</h3>
                            <p>{content}</p>
                        </div>
                        <hr className="divider" />
                        <div className="modal-nutrition">
                            <h3>영양 정보</h3>
                            <p>중량 (1인분): {info.INFO_WGT }</p>
                            <p>열량: {info.INFO_ENG }</p>
                            <p>탄수화물: {info.INFO_CAR }</p>
                            <p>단백질: {info.INFO_PRO }</p>
                            <p>지방: { info.INFO_FAT}</p>
                            <p>나트륨: {info.INFO_NA }</p>
                        </div>
                        
                    </div>
                </div>
                <hr className="divider" />
                        <div className="modal-method">
                            <h3>조리 방법</h3>
                            <p>{info.MANUAL01 }</p>
                        </div>
            </div>
        </div>
    );
};

export default Modal;
