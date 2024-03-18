import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../icons/Logo";
import Google from "../../icons/Google";
import GitHub from "../../icons/GitHub";
import TextInput from "../TextInput/TextInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import { BlueButtonStyled } from "../BlueButton/BlueButton";

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

const OtherAuth = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  margin-bottom: 30px;
`;

const AuthButton = styled.button`
  font-family: "BasisGrotesquePro-Medium";
  width: 100%;
  height: 48px;
  background: transparent;
  border: 1.2px solid #d3d8dc;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  color: #060e1e;

  span {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
`;

const DividerWrapper = styled.div`
  height: 16px;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;

  span {
    font-family: "BasisGrotesquePro-Medium";
    color: #bec5cc;
    margin: 0 5px;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e3e6e9;
`;

const InputWrapper = styled.div`
  width: 100%;

  &.last {
    margin-top: 25px;
  }
`;

const SubmitButtonWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  width: 100%;
`;

const LinkStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;

  a {
    font-family: "BasisGrotesquePro-Medium";
    text-decoration: none;
    color: #316fea;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    cursor: pointer;
  }
`;

const LinkStyledSignUp = styled(LinkStyled)`
  justify-content: center;
  white-space: pre-wrap;

  span {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.20000000298023224px;
    color: #383838;
  }
`;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail =
      emailRegex.test(event.target.value) || !event.target.value;
    if (!isValidEmail) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }

    if (showPassword === false) {
      setShowPassword(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Title>Log in to your account</Title>
      <OtherAuth>
        <AuthButton type="button">
          <Google />
          <span>Google</span>
        </AuthButton>
        <AuthButton type="button">
          <GitHub />
          <span>Github</span>
        </AuthButton>
      </OtherAuth>
      <DividerWrapper>
        <Line />
        <span>OR</span>
        <Line />
      </DividerWrapper>
      <InputWrapper>
        <TextInput
          value={email}
          onChange={handleEmailChange}
          type="email"
          placeholder="Enter your email"
          errorText={emailError}
        />
      </InputWrapper>
      {showPassword && (
        <InputWrapper className="last">
          <PasswordInput
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            errorText={passwordError}
          />
        </InputWrapper>
      )}
      {showForgotPassword && (
        <LinkStyled>
          <Link to="/forgot-password">Forgot your password?</Link>
        </LinkStyled>
      )}
      <SubmitButtonWrapper>
        <BlueButtonStyled disabled={!email || !password} onClick={handleSubmit}>
          Log in to Qencode
        </BlueButtonStyled>
      </SubmitButtonWrapper>
      <LinkStyledSignUp>
        <span>Is your company new to Qencode? </span>
        <Link to="/sign-up">Sign up</Link>
      </LinkStyledSignUp>
    </Form>
  );
};

export default LoginForm;
