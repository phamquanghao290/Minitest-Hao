import React, { useEffect, useState } from "react";
import axios from "axios";

function Todos() {
    const [allTodo, setAllTodo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const handleGetAllTodos = async () => { 
        const res = await axios.get("http://localhost:3000/api/todos");
        setAllTodo(res.data);
        
    };

    useEffect(() => {
        handleGetAllTodos();
        document.title = "Todos";
    },[]);

    const [newTodo, setNewTodo] = useState({nameTodo: ""});
    const handleGetInput = (e) => {
        setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
    };
    const handleAdd = async () => {
        if (newTodo.nameTodo === "") {
            window.alert("Vui lòng nhập todo");
            return
        }   
            const res = await axios.post( "http://localhost:3000/api/todos",
                    {
                        ...newTodo,
                        id: Math.floor(Math.random() * 999999)
                    }
                );
                setNewTodo({ nameTodo: "" });
                setAllTodo(res.data);
    };

    const handleEdit = (item) => {
        setNewTodo({ ...item, nameTodo: item.nameTodo });
        setIsEditing(true);
    };

    const handleSave = async () => {
        const res = await axios.put(`http://localhost:3000/api/todos/${newTodo.id}`,{ ...newTodo });
        setNewTodo({ nameTodo: "" });
        setIsEditing(false);
        setAllTodo(res.data);
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Xác nhận xóa");
        if (confirm) {
            const res = await axios.delete(`http://localhost:3000/api/todos/${id}`);
            setAllTodo(res.data);
        }
    };

    const handleDeleteAll = async () => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/todos`);    
            setAllTodo(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeStatus = async (item) => {
        const res = await axios.patch(`http://localhost:3000/api/todos/${item.id}`,item);     
        setFlag(!flag);
    };

    const number = allTodo.filter((item) => item.completed === false) 

    return (
        <div className="bg-blue-200 w-full h-[750px]">
            <br />
            <br />
            <div className="border-solid border-2 border-indigo-600 m-auto bg-orange-300 w-1/3 mt-11 rounded-lg">
                <br />
                <h1 className="text-3xl font-bold text-center">Todo List</h1>
                <br />
                <input
                    type="text"
                    className="border-solid border-2 border-indigo-600 ml-9 rounded-l-lg w-3/4 h-10 pl-4"
                    placeholder="Todo"
                    name="nameTodo"
                    onChange={handleGetInput}
                    value={newTodo.nameTodo}
                />
                {isEditing ? (
                    <button
                        className="border-2 h-10 rounded-r-lg pl-4 pr-4"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        className="border-2 h-10 rounded-r-lg pl-4 pr-4"
                        onClick={handleAdd}
                    >
                        Add
                    </button>
                )}
                <div className="mb-11">
                    {allTodo?.map((item, index) => (
                        <div key={index} className="flex">
                            <p className="border-solid border-2 bg-white rounded-l-lg ml-9 w-3/6 h-10 pl-4 pt-2 mt-5"
                            style={{textDecoration: item.completed ? 'line-through' : 'none'}}>
                                {item.nameTodo}
                            </p>
                            <button
                                onClick={() => handleChangeStatus(item)}
                                className="border-2 pl-4 pr-4 mt-5"
                            >
                                Com
                            </button>
                            <button
                                onClick={() => handleEdit(item)}
                                className="border-2 pl-4 pr-4 mt-5"
                            >
                                Sửa
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="border-2 pl-4 pr-4 rounded-r-lg mt-5"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>
                <br />
                <div className="flex justify-around align-center">
                    <h2 className="text-center mb-9 font-bold text-lg">
                        You have {number.length} todos
                    </h2>
                    <button
                        className="block bg-red-500 w-[100px] h-[40px] rounded-lg"
                        onClick={handleDeleteAll}
                    >
                        Delete all
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Todos;
