import { useState } from "react";
import { Link } from "react-router-dom";
import './CreateTodo.css'

import axios from "axios";

export function CreateTodo() {
    const [data, setData] = useState({ title: "", description: "" });

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(err) {
        err.preventDefault();

        const todo = {
            title: data.title,
            description: data.description,
        };

        console.log({ todo });
        axios
            .post("https://server-client.onrender.com", data)
            .then((res) => {
                setData({ title: "", description: "" });
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Error couldn't create TODO");
                console.log(err.message);
            });
    }

    return (
        <section className="container">
            <section className="create">
                <form
                    onSubmit={handleSubmit}
                    className="form-container"
                    noValidate
                >
                    <label className="label" htmlFor="title">
                    <h3>Title</h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <textarea
                        rows="2"
                        cols="50"
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        className="input"
                    />
                    <br></br>
                    <br></br>
                    <label className="label-desc" htmlFor="description">
                        <h3>Description</h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <textarea
                        rows="6" 
                        cols="50"
                        type="text"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="input"
                    />
                    <br></br><br></br><br></br>
                    <Link to="/" className="button-back">
                        <button type="button" className="button">
                            Cancel
                        </button>
                    </Link>
                        <button type="submit" className="button">
                            Add task
                        </button>
                </form>
            </section>
        </section>
    );
}