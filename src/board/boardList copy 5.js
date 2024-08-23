import React, { useState, useEffect } from 'react';
import './boardList.css';

const DataDisplay = () => {
    const [dataBoard, setDataBoard] = useState([]);
    const [board, setBoard] = useState({
       id: null,
       title: '',
       writer: '',
       content: '',
       createDate: new Date().toISOString()
    });

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoard(prevBoard => ({
            ...prevBoard,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (board.id) {
            await updateBoard();
        } else {
            await InsertBoard();
        }
        resetForm();
    };

    const handleSelect = (item) => {
        setBoard({
            id: item.id,
            title: item.title,
            content: item.content,
            writer: item.writer
        });
    };

    const loadBoard = async () => {
        const token = sessionStorage.getItem('token');
        console.log('loadboard');
        await fetch('http://192.168.0.130:8080/board', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        })
        .then(resp => resp.json())
        .then(result => {
            setDataBoard(result);
        })
        .catch(error => {
            console.error('Error fetching Board:', error);
        });
    };

    const InsertBoard = async () => {
        const token = sessionStorage.getItem('token');
        console.log('insertboard');
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

    const DeleteBoard = async (id) => {
        const token = sessionStorage.getItem('token');
        console.log('deleteboard');
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

    const updateBoard = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await fetch(`http://192.168.0.130:8080/board/${board.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(board)
            });
            resetForm();
            await loadBoard();
        } catch (error) {
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
            <table className='board-table' align="center">
                <thead>
                    <tr>
                        <th className='board-th'>ID</th>
                        <th className='board-th'>Title</th>
                        <th className='board-th'>Writer</th>
                        <th className='board-th'>Content</th>
                        <th className='board-th'>Create Date</th>
                        <th className='board-th'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {dataBoard.map(board => (
                        <tr key={board.id} className='board-tr' onClick={() => handleSelect(board)}>
                            <td className='board-td'>{board.id}</td>
                            <td className='board-td'>{board.title}</td>
                            <td className='board-td'>{board.writer}</td>
                            <td className='board-td'>{board.content}</td>
                            <td className='board-td'>{board.createDate}</td>
                            <td className='board-td'>
                                <button className='board-button' onClick={(e) => {
                                    e.stopPropagation();
                                    DeleteBoard(board.id);
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
            <h2 className='board-title'>게시판</h2>
            <button className='board-button' onClick={loadBoard}>게시판</button>
            <div>{loadData()}</div>

            <form onSubmit={handleSubmit} className="board-form">
                <div>
                    <label>Title: </label>
                    <input type="text" name="title" value={board.title} onChange={handleChange} required />
                </div>
                <div>
                    <label>Writer: </label>
                    <input type="text" name="writer" value={board.writer} onChange={handleChange} required />
                </div>
                <div>
                    <label>Content: </label>
                    <textarea name="content" value={board.content} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="board-button">{board.id ? '수정' : '등록'}</button>
            </form>
        </div>
    );
};

export default DataDisplay;
