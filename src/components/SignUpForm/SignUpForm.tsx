import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Google from "../../icons/Google";
import GitHub from "../../icons/GitHub";
import TextInput from "../TextInput/TextInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import { BlueButtonStyled } from "../BlueButton/BlueButton";
import { getAccessTokenFromSessionStorage } from "../../utils/storage";
import { isValidEmail } from "../../utils/validation";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseApp } from "../../firebase";

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

const SignUpForm = () => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailApiError, setEmailApiError] = useState("");
  const [emailFormatError, setEmailFormatError] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set focus to the input field when the component mounts
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    setEmailApiError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
        alert("Success! Go to login page.");

        navigate("/login");
      })
      .catch((error) => {
        // Handle errors here.
        const errorMessage = error.message;
        const errorCode = error.code;

        switch (errorCode) {
          case "auth/weak-password":
            setEmailApiError("The password is too weak.");
            break;
          case "auth/email-already-in-use":
            setEmailApiError(
              "This email address is already in use by another account."
            );
            break;
          case "auth/invalid-email":
            setEmailApiError("This email address is invalid.");
            break;
          case "auth/operation-not-allowed":
            setEmailApiError("Email/password accounts are not enabled.");
            break;
          default:
            setEmailApiError(errorMessage);
            break;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    const isEmailCorrect =
      isValidEmail(event.target.value) || !event.target.value;

    if (isEmailCorrect) {
      setEmailFormatError("");
    } else {
      setEmailApiError("");
      setEmailFormatError("Invalid email format");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    //all validations should be consistent with the back-end validation
    if (event.target.value && event.target.value.length < 8) {
      setPasswordLengthError("Password should be at least 8 symbols");
    } else {
      setPasswordLengthError("");
    }
  };

  useEffect(() => {
    const accessToken = getAccessTokenFromSessionStorage();

    if (accessToken) {
      alert("You are already authorized");
    }
  }, []);

  return (
    <OverlayContainer>
      <Form onSubmit={handleSubmit} noValidate>
        <Title>Register your account</Title>
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
            errorText={emailApiError || emailFormatError}
            ref={inputRef}
          />
        </InputWrapper>
        <>
          <InputWrapper className="last">
            <PasswordInput
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              errorText={passwordLengthError}
            />
          </InputWrapper>
        </>
        <SubmitButtonWrapper>
          <BlueButtonStyled
            type="submit"
            disabled={
              !email ||
              !password ||
              Boolean(emailFormatError) ||
              Boolean(passwordLengthError)
            }
            onClick={handleSubmit}
          >
            Submit
          </BlueButtonStyled>
        </SubmitButtonWrapper>
        <LinkStyledSignUp>
          <span>Are your already have an account? </span>
          <Link to="/login">Log in</Link>
        </LinkStyledSignUp>
      </Form>

      <LoadingOverlay isLoading={loading} />
    </OverlayContainer>
  );
};

export default SignUpForm;
