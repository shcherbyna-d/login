import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage/ResetPasswordPage";
import NoPage from "./components/pages/NoPage/NoPage";
import SignUpPage from "./components/pages/SignUpPage/SignUpPage";
import "./App.css";
import "./fonts/BasisGrotesquePro-Regular.woff2";
import "./fonts/BasisGrotesquePro-Bold.woff2";
import "./fonts/BasisGrotesquePro-Medium.woff2";
import HomePage from "./components/pages/HomePage/HomePage";
import { AuthProvider } from "./providers/AuthProvider";
import ProtectedRoute from "./providers/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
