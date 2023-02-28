import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateTodo } from "./UpdateTodo";
import './ShowToDoList.css';

function TodoCard({ data, handleEdit, handleDelete }) {
    const { _id, title, description } = data;

    return (
        <div className="showToDoList">
            {/* <li key={_id}> */}
                <div className="title-description">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>

                <div className="button-container">
                    <button className="button" name={_id} onClick={handleEdit}>
                        Edit
                    </button>
                    <button className="button" name={_id} onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            {/* </li> */}
        </div>
    );
}

export function ShowTodoList() {
    const [todo, setTodo] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const [update, setUpdate] = useState(false);

    useEffect(
        function () {
            axios
                .get("https://server-client.onrender.com/api/todo")
                .then((res) => {
                    console.log(res.data);
                    setTodo(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        },
        [update]
    );

    function handleEdit(err) {
        setId(err.target.name); 
        setOpen(true);
    }

    function handleUpdate() {
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    function handleDelete(err) {
        axios.delete(`https://server-client.onrender.com/api/todo/${err.target.name}`);

        setTodo((data) => {
            return data.filter((todo) => todo._id !== err.target.name);
        });
    }

    function handleClose() {
        setId("");
        setOpen(false);
    }

    return (
        <section className="container">
            {/* <Link to="/create-todo" className="button-new">
                <button className="button">New Task</button>
            </Link> */}
            <section className="contents">
            <Link to="/create-todo" className="button-new">
                <button className="button"> Add New Task</button>
            </Link> 
                <h1>Backlogs</h1>
                <ul className="list-container">
                    {todo.map((data) => (
                        <TodoCard
                            data={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </section>
            
            {open ? (
                <section className="update-container">
                    <div className="update-contents">
                        <p onClick={handleClose} className="close">
                            &times;
                        </p>

                        <UpdateTodo
                            _id={id}
                            handleClose={handleClose}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                </section>
            ) : (
                ""
            )}
        </section>
        
    );
}