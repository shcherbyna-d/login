import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Logo from "../../icons/Logo";
import { BlueButtonStyled } from "../BlueButton/BlueButton";
import PasswordInput from "../PasswordInput/PasswordInput";
import { ApiError, setNewPassword } from "../../api/auth";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState("");
  const [secret, setSecret] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set focus to the input field when the component mounts
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenFromURL = searchParams.get("token");
    const secretFromURL = searchParams.get("secret");

    setToken(tokenFromURL || "");
    setSecret(secretFromURL || "");
  }, [location.search]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await setNewPassword({ token, secret, password });

      //need to design separate place in form for success notification
      navigate("/login");
    } catch (error) {
      if (error instanceof ApiError) {
        if (Array.isArray(error.details)) {
          error.details.forEach((fieldError) => {
            if (fieldError.field_name === "password") {
              setPasswordError(fieldError.error);
            }
          });
        } else if (typeof error.details === "string") {
          setPasswordError(error.details);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    //all validations should be consistent with the back-end validation
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
    <OverlayContainer>
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
            ref={inputRef}
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
          />
        </InputWrapper>
        <BlueButtonStyled
          disabled={
            !password || !confirmPassword || confirmPassword !== password
          }
          onClick={handleSubmit}
        >
          Reset Password
        </BlueButtonStyled>
      </Form>

      <LoadingOverlay isLoading={loading} />
    </OverlayContainer>
  );
};

export default ResetPasswordForm;
