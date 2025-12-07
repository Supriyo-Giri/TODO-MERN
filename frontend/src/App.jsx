import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

const App = () => {
  const [todos, setTodo] = useState([]);
  const [text, setText] = useState("");

  const fetchTodos = async () =>{
    try {
      const res = await axios.get('http://localhost:5000/api/get-all-tasks');
      setTodo(res.data);
    } catch (error) {
      console.log("Fetch error: ",error);
    }
  }

  const addTodo = async (e) => {
    e.preventDefault();
    if(!text.trim()) return alert('Please add something!');
    try {
      const res = await axios.post('http://localhost:5000/api/add',{task:text, done:false});
      setTodo([...todos, res.data]);
      setText("");
    } catch (error) {
      console.log("Add Error:", error);
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      setTodo(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.log(`Delete error: ${error}`);
    }
  }

  const toggleDone = async (id, done) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/update-done/${id}`,{done: !done});
      setTodo(todos.map(todo =>
        todo._id === id ? res.data : todo
      ));
    } catch (error) {
      console.log("Toggle Error:", error);
    }
  }

  useEffect(()=>{
    fetchTodos();
  },[])
  
  return (
    <div>
      <h2>TODO Application</h2>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
            <form className="d-flex" role="text">
              <input className="form-control me-2" type="text" placeholder="Make todo"
               aria-label="Search" onChange={(e)=>setText(e.target.value)}/>
              <button className="btn btn-outline-success" type="submit" onClick={addTodo}>Add</button>
            </form>
        </div>
      </nav>

      {
        todos.map(todo => (
          <li key={todo._id}>
            <input  type="checkbox" 
                    checked={todo.done}
                    onChange={() => toggleDone(todo._id,todo.done)} />
            <span style={{
              marginLeft: "10px",
              textDecoration: todo.done ? "line-through" : "none"
            }}>{todo.task}</span>
            <img src="" alt="" className='delImg' onClick={()=>deleteTodo(todo._id)}/>
          </li>
        ))
      }
    </div>
  )
}

export default App
