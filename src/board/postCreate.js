import React, { useState, useEffect } from 'react';

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
        await loadBoard(board);
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
        console.log('abcd')
        await fetch('http://192.168.0.130:8080/board')
            .then(resp => {
                return resp.json();
            }).then(result => {
                setDataBoard(result);
            }).catch(error => {
                console.error('Error fetching Board:', error);
            });
    };

    const InsertBoard = async () => { //데이터넣고
        console.log('abcd')
        await fetch('http://localhost:8080/board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'jwt-token'
            },
            body: JSON.stringify(board)
        })
            .then(loadBoard)
            .catch(error => {
                console.error('Error fetching Board:', error);
            });
    };


    const DeleteBoard = async (id) => { //데이터지우고
        console.log('DeleteBoard called for ID:', id);
        await fetch(`http://localhost:8080/board/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'jwt-token'
            }
        })
            .then(loadBoard)
            .catch(error => {
                console.error('Error fetching Board:', error);
            });
    };

    const updateBoard = async () => { //데이터수정
        try{
            const response = await fetch('http://192.168.0.130:8080/board', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'jwt-token'
            }, body: JSON.stringify(board)
            
        });
            const result = await response.json();
                setBoard({ id: null, title: '', writer: '' , content: ''});
                loadBoard();
            }
            catch(error) {
                console.error('Error fetching Board:', error);
            }
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
                            <button onClick={() => DeleteBoard(board.id)}>Delete</button>
                        </td>

                    </tr>

                ))}
            </tbody>
        </table>
    );
};

return (
    <div>
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
            <button onClick={InsertBoard}>등록</button>
            <button onClick={updateBoard}>수정</button>

            {/* loadData함수 호출(저장된 데이터를 테이블 형태로 표시) */}
        </form>
        <div>{loadData()}</div>
    </div>
);

};
export default DataDisplay;
 
//   return (
//     <div className="post-create-container">
//       <h1 className="post-create-title">게시글 작성</h1>
//       <form onSubmit={handleFormSubmit}>
//         <div className="form-group">
//           <label htmlFor="title">제목</label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={handleTitleChange}
//             required
//             className="form-control"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="content">내용</label>
//           <textarea
//             id="content"
//             value={content}
//             onChange={handleContentChange}
//             required
//             className="form-control"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="image">사진 업로드</label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="form-control"
//           />
//         </div>
//         <div className="form-actions">
//           <button type="button" className="form-button edit-button">수정</button>
//           <button type="submit" className="form-button submit-button">등록</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PostCreate;
