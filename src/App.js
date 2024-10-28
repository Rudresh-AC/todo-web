import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store/store";
import TodoScreen from "./screens/TodoScreen";
import LoginScreen from "./screens/LoginScreen";
import { loadAuthStatus } from "./store/authSlice";
import localforage from "localforage";
import "./app.css";

function AppContent() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedStatus = await localforage.getItem("isAuthenticated");
      if (storedStatus) {
        dispatch(loadAuthStatus());
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/todo" element={<TodoScreen />} />
      <Route path="/" element={<LoginScreen />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}
