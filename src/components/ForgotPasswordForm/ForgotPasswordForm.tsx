import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Logo from "../../icons/Logo";
import TextInput from "../TextInput/TextInput";
import { BlueButtonStyled } from "../BlueButton/BlueButton";
import { Link } from "react-router-dom";
import { ApiError, resetPassword } from "../../api/auth";
import { isValidEmail } from "../../utils/validation";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

const OverlayContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

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
  const [emailApiError, setEmailApiError] = useState("");
  const [emailFormatError, setEmailFormatError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set focus to the input field when the component mounts
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await resetPassword(email);

      //need to design separate place in form for success notification
      alert("Please check your mailbox for set new password");
    } catch (error) {
      if (error instanceof ApiError) {
        if (Array.isArray(error.details)) {
          error.details.forEach((fieldError) => {
            if (fieldError.field_name === "email") {
              setEmailFormatError("");
              setEmailApiError(fieldError.error);
            }
          });
        } else if (typeof error.details === "string") {
          setEmailFormatError("");
          setEmailApiError(error.details);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    const isEmailCorrect =
      isValidEmail(event.target.value) || !event.target.value;

    if (isEmailCorrect) {
      setEmailFormatError("");
    } else {
      setEmailFormatError("Invalid email format");
      setEmailApiError("");
    }
  };

  return (
    <OverlayContainer>
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
            errorText={emailApiError || emailFormatError}
            ref={inputRef}
          />
        </InputWrapper>
        <BlueButtonStyled
          type="submit"
          disabled={!email || Boolean(emailFormatError)}
          onClick={handleSubmit}
        >
          Send
        </BlueButtonStyled>
        <WhiteButton onClick={handleSubmit}>
          <Link to="/login">Cancel</Link>
        </WhiteButton>
      </Form>

      <LoadingOverlay isLoading={loading} />
    </OverlayContainer>
  );
};

export default ForgotPasswordForm;
