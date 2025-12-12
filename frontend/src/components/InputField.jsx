import React, { useEffect, useState } from "react";
import "./components.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const InputField = ({ refresh }) => {
  const [newTodo, setNewTodo] = useState({
    task: "",
  });
  const addNewTodo = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/add",
        {
          task: newTodo.task,
        },
        { new: true }
      );
      toast.success("Successfully created todo!");
      refresh();
    } catch (error) {
      toast.error(error);
      console.log(`Error in creating todo! ${error}`);
    }
  };
  return (
    <div>
      <div className="input-group mb-3 input-container">
        <input
          type="text"
          className="form-control"
          placeholder="Add task"
          aria-label="Recipient’s username"
          aria-describedby="basic-addon2"
          onChange={(e) => setNewTodo({ task: e.target.value })}
        />

        <button
          type="button"
          className="btn btn-primary button"
          onClick={addNewTodo}
        >
          Add todo
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default InputField;
