import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navigate } from 'react-router-dom';

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token;
}

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="editor" element={isLoggedIn() ? <Editor /> : <Navigate to='login'/>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;