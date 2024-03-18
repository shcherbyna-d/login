import React, { InputHTMLAttributes, useState } from "react";
import styled from "styled-components";
import Eye from "../../icons/Eye";

const TextInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
`;

const InputBlueBorder = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 7px;
  border: 1.2px solid transparent;
  transition: border-color 0.2s;

  &:hover {
    border-color: #316fea87;
  }

  &:focus-within {
    border-color: #316fea87;

    .input {
      border-color: #316fea;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: 1.2px solid #d3d8dc;
  border-radius: 6px;
  padding: 0px 12px;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: #a1abb5;
  }
`;

const ErrorText = styled.span`
  position: absolute;
  top: 53px;
  font-size: 10px;
  color: red;
`;

const IconWrapper = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  position: absolute;
  height: 100%;
  right: 16px;
  top: 0;
  display: flex;
  align-items: center;

  svg {
    transition: opacity 0.2s;
    cursor: pointer;
  }

  svg:hover {
    opacity: 0.5;
  }
`;

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorText?: string;
}

const PasswordInput = (props: PasswordInputProps) => {
  const { errorText, ...rest } = props;

  const [passwordShown, setPasswordShown] = useState(false);

  const toogleVisability = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <TextInputContainer>
      <InputBlueBorder>
        <Input
          className="input"
          type={passwordShown ? "text" : "password"}
          {...rest}
        />
        <IconWrapper onClick={toogleVisability}>
          <Eye />
        </IconWrapper>
      </InputBlueBorder>
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </TextInputContainer>
  );
};

export default PasswordInput;
