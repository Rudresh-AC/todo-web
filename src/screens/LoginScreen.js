import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, saveAuthStatus } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "user" && password === "password") {
      dispatch(login());
      dispatch(saveAuthStatus(true));
      navigate("/todo");
      alert(`Welcome, ${username}!`);
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginScreen;
