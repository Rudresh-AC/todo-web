import { createSlice } from "@reduxjs/toolkit";
import localforage from "localforage";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks: (state, action) => {
      return action.payload;
    },
    addTask: (state, action) => {
      state.push(action.payload);
    },
    updateTask: (state, action) => {
      const { index, task } = action.payload;
      state[index] = task;
    },
    deleteTask: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
    clearTasks: () => {
      return [];
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, clearTasks } =
  tasksSlice.actions;

export const loadTasks = () => async (dispatch) => {
  try {
    const storedTasks = await localforage.getItem("tasks");
    const tasks = storedTasks || [];
    dispatch(setTasks(tasks));
  } catch (error) {
    console.error("Failed to load tasks:", error);
  }
};

export const saveTasks = (tasks) => async () => {
  try {
    await localforage.setItem("tasks", tasks);
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
};

export const clearTasksFromStorage = () => async (dispatch) => {
  try {
    await localforage.removeItem("tasks");
    dispatch(clearTasks());
  } catch (error) {
    console.error("Failed to clear tasks from storage:", error);
  }
};

export default tasksSlice.reducer;
