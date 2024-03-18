import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../icons/Logo";
import TextInput from "../TextInput/TextInput";
import { BlueButtonStyled } from "../BlueButton/BlueButton";
import { Link } from "react-router-dom";

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
`;

const WhiteButton = styled(BlueButtonStyled)`
  background-color: white;
  border: 1.2px solid #d3d8dc;
  margin-top: 25px;
  transition: border-color 0.2s;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #060e1e;
  }

  &:hover:not(:disabled) {
    background-color: white;
    border-color: black;
  }
`;

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

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
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Title>Forgot Password?</Title>
      <InputWrapper>
        <TextInput
          value={email}
          onChange={handleEmailChange}
          type="email"
          placeholder="Enter your email"
          errorText={emailError}
        />
      </InputWrapper>
      <BlueButtonStyled disabled={!email} onClick={handleSubmit}>
        Send
      </BlueButtonStyled>
      <WhiteButton onClick={handleSubmit}>
        <Link to="/login">Cancel</Link>
      </WhiteButton>
    </Form>
  );
};

export default ForgotPasswordForm;
