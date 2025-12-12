import "./components.css";
import deleteImg from "../assets/delete.png";
import editImg from "../assets/write.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";

const TodoCard = ({ refresh, id, task, isDone }) => {
  const [editText, setEditText] = useState("");
  const [editBox, setEditBox] = useState(false);

  const handleIsDone = async (newValue) => {
    try {
      await axios.put(`http://localhost:5000/api/update-todo/${id}`, {
        done: newValue,
      });
      toast.success(newValue ? "Task is done" : "Task is not done!");
      refresh();
    } catch (error) {
      toast.error(`Something went wrong!`);
      console.log(error);
    }
  };
  const DeleteTodo = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      toast.success(`Todo is deleted!`);
      console.log(`task with id: ${id} deleted from database!`);

      refresh();
    } catch (error) {
      toast.error(`Something went wrong!`);
      console.log(`Error in deleting todo: ${error}`);
    }
  };
  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/update-todo/${id}`, {
        task: editText,
      });
      toast.success(`Todo updated!`);
      refresh();
    } catch (error) {
      toast.error(`Something went wrong!`);
      console.log(`Error in updating todo: ${error}`);
    }
  };
  if (editBox) {
    return (
      <div className="edit-box">
        <input
          type="text"
          className="form-control edit-text-field"
          placeholder="Edit todo"
          aria-label="Recipient’s username"
          aria-describedby="basic-addon2"
          onChange={(e) => setEditText(e.target.value)}
        />

        <div className="submit">
          <button
            type="button"
            class="btn btn-success"
            onClick={() => {
              handleEdit();
              setEditBox(false);
            }}
          >
            Submit
          </button>
          <button
            type="button"
            class="btn btn-outline-danger"
            onClick={() => {
              setEditBox(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-card-container" key={id}>
      <div className="is-chekcked-container">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isDone}
            onChange={() => {
              handleIsDone(!isDone);
            }}
          />
        </div>
      </div>
      <p
        className="todo-text"
        style={{
          textDecoration: isDone ? "line-through" : "none",
          margin: 0,
        }}
      >
        {task}
      </p>
      <div className="edit-options">
        <img
          src={editImg}
          alt=""
          className="delete-img"
          onClick={() => {
            setEditBox(true);
          }}
        />
        <img
          src={deleteImg}
          alt=""
          className="delete-img"
          onClick={DeleteTodo}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default TodoCard;
