// ForgotPassword.js
import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    // Implement logic for forgot password
    console.log("Sending forgot password email to:", email);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Reset Password</button>
    </div>
  );
};

export default ForgotPasswordPage;
