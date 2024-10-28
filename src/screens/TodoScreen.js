import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  updateTask,
  deleteTask,
  loadTasks,
  saveTasks,
  clearTasksFromStorage,
} from "../store/taskSlice";
import { logout, saveAuthStatus, clearAuthStatus } from "../store/authSlice";

export default function TodoScreen({ history }) {
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const taskList = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(saveTasks(taskList));
  }, [taskList, dispatch]);

  useEffect(() => {
    if (editingIndex !== null) {
      setTask(taskList[editingIndex]);
    } else {
      setTask("");
    }
  }, [editingIndex, taskList]);

  const handleAddOrUpdateTask = () => {
    if (editingIndex !== null) {
      dispatch(updateTask({ index: editingIndex, task }));
      setEditingIndex(null);
    } else {
      dispatch(addTask(task));
    }
    setTask("");
  };

  const handleDelete = (index) => {
    dispatch(deleteTask(index));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(saveAuthStatus(false));
    dispatch(clearAuthStatus());
    dispatch(clearTasksFromStorage());
    history.push("/");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <input
        placeholder="Add your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAddOrUpdateTask}>
        {editingIndex !== null ? "Update" : "Add"}
      </button>

      <ul>
        {taskList.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
