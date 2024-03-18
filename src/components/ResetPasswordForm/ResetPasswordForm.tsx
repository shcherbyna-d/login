import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../icons/Logo";
import { BlueButtonStyled } from "../BlueButton/BlueButton";
import PasswordInput from "../PasswordInput/PasswordInput";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoWrapper = styled.div`
  margin-bottom: 80px;
`;

const Title = styled.h2`
  font-family: "BasisGrotesquePro-Bold";
  font-size: 30px;
  font-weight: 700;
  line-height: 39px;
  margin-bottom: 40px;
  color: #1a1919;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 25px;

  &.last {
    margin-bottom: 30px;
  }
`;

const Label = styled.label`
  font-family: "BasisGrotesquePro-Medium";
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.0024em;
  color: #060e1e;
`;

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.target.value && event.target.value.length < 8) {
      setPasswordError("Password should be at least 8 symbols");
    } else {
      setPasswordError("");
    }

    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (event.target.value && event.target.value !== password) {
      setConfirmPasswordError("Passwords are not equal");
    } else {
      setConfirmPasswordError("");
    }

    setConfirmPassword(event.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Title>Create new Password?</Title>
      <InputWrapper>
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          errorText={passwordError}
        />
      </InputWrapper>
      <InputWrapper className="last">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <PasswordInput
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Password"
          errorText={confirmPasswordError}
          disabled={Boolean(passwordError)}
        />
      </InputWrapper>
      <BlueButtonStyled
        disabled={!password || !confirmPassword || confirmPassword !== password}
        onClick={handleSubmit}
      >
        Reset Password
      </BlueButtonStyled>
    </Form>
  );
};

export default ResetPasswordForm;
