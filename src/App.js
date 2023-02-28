import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ShowTodoList } from "./components/ShowTodoList";
import { CreateTodo } from "./components/CreateTodo";
import "./App.css";

function App() {
    return (
        <div className="container">
            <div className="app-contents">
                <BrowserRouter>
                    <Routes>   
                        <Route exact path="/" element={<ShowTodoList/>} />  
                        <Route path="/create-todo" element={<CreateTodo/>} /> 
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;