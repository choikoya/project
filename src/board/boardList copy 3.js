import React, { useState, useEffect } from 'react';
import './boardList.css';

const DataDisplay = () => {
    const [dataBoard, setDataBoard] = useState([]);
    const [board, setBoard] = useState({
       id:null,
        title: '',
        writer: '',
        content: '',
        createDate: new Date().toISOString()
    });

    //폼 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoard(prevBoard => ({
            ...prevBoard,
            [name]: value
        }));
    };

    //폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (board.id) {
            await updateBoard();  // id가 있을 경우 수정
        } else {
            await InsertBoard();  // id가 없을 경우 등록
        }
        resetForm();  // 폼 초기화
    };

    const handleSelect = (item) => {
        setBoard({
            id: item.id,
            title: item.title,
            content: item.content,
            writer: item.writer
        });
    };

    const loadBoard = async () => { //전체게시판읽고
        const token = sessionStorage.getItem('token');
        console.log('abcd')
        await fetch('http://192.168.0.130:8080/board',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
       
    })
            .then(resp => {
                return resp.json();
            }).then(result => {
                setDataBoard(result);
            }).catch(error => {
                console.error('Error fetching Board:', error);
            });
    };

    const InsertBoard = async () => { //데이터넣고
        const token = sessionStorage.getItem('token');
        console.log('abcd')
        await fetch('http://192.168.0.130:8080/board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(board)
        })
            .then(loadBoard)
            .catch(error => {
                console.error('Error fetching Board:', error);
            });
            await loadBoard();
    };


    const DeleteBoard = async (id) => { //데이터지우고
        const token = sessionStorage.getItem('token');
        console.log('DeleteBoard called for ID:', id);
        await fetch(`http://192.168.0.130:8080/board/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
            .then(loadBoard)
            .catch(error => {
                console.error('Error fetching Board:', error);
            });
    };

    const updateBoard = async () => { //데이터수정
        const token = sessionStorage.getItem('token');
        try{
            const response = await fetch(`http://192.168.0.130:8080/board/${board.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }, body: JSON.stringify(board)
            
        })
        
        resetForm();  // 폼 초기화
        await loadBoard();
            }
            catch(error) {
                console.error('Error fetching Board:', error);
            }
    };
    const resetForm = () => {
        setBoard({
            id: null,
            title: '',
            writer: '',
            content: '',
            createDate: new Date().toISOString()
        });
    };


    const loadData = () => {
      return (
        <table align="center">
            <thead>
                <tr>
                    <th>ID</th><th>title</th><th>writer</th>
                    <th>content</th><th>createDate</th>
                </tr>
            </thead>
            <tbody>
                {dataBoard.map(board => (
                    <tr key={board.id} onClick={() => handleSelect(board)}>
                        <td>{board.id}</td>
                        <td>{board.title}</td>
                        <td>{board.writer}</td>
                        <td>{board.content}</td>
                        <td>{board.createDate}</td>
                        <td>
                            <button onClick={(e) => {
                             e.stopPropagation(); // 클릭 이벤트 전파 방지
                                DeleteBoard(board.id)
                            }}>Delete</button>
                        </td>

                    </tr>

                ))}
            </tbody>
        </table>
    );
};

return (
    <div className='board-container'>
        <h2>Data Display</h2>
        <button onClick={loadBoard}>게시판</button>

        {/* loadBoard함수 호출(서버에서 데이터 가져와 업데이트) */}
        {/* <button onClick={()=>loadBoard()}>Board</button>  */}

        <form onSubmit={handleSubmit}>
            <div>
                <label>Title: </label>
                <input type="text" name="title" value={board.title} onChange={handleChange} required />
            </div>
            <div>
                <label>writer: </label>
                <input type="text" name="writer" value={board.writer} onChange={handleChange} required />
            </div>
            <div>
                <label>Content: </label>
                <input type="text" name="content" value={board.content} onChange={handleChange} required />
            </div>
            <button type="submit">{board.id ? '수정' : '등록'}</button>

            {/* loadData함수 호출(저장된 데이터를 테이블 형태로 표시) */}
        </form>
        <div>{loadData()}</div>
    </div>
);

};
export default DataDisplay;