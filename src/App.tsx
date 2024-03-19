import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage/ResetPasswordPage";
import NoPage from "./components/NoPage/NoPage";
import "./App.css";
import "./fonts/BasisGrotesquePro-Regular.woff2";
import "./fonts/BasisGrotesquePro-Bold.woff2";
import "./fonts/BasisGrotesquePro-Medium.woff2";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LoginPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/forgot-password" Component={ForgotPasswordPage} />
        <Route path="/reset-password" Component={ResetPasswordPage} />
        <Route path="/*" Component={NoPage} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
