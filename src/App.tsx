// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage/ForgotPasswordPage";
import NewPasswordPage from "./components/NewPasswordPage/NewPasswordPage";
import HomePage from "./components/HomePage/HomePage";
import NoPage from "./components/NoPage/NoPage";
import "./App.css";
import "./fonts/BasisGrotesquePro-Regular.woff2";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/forgot-password" Component={ForgotPasswordPage} />
        <Route path="/create-new-password" Component={NewPasswordPage} />
        <Route path="/*" Component={NoPage} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
