import styled from "styled-components";

export const BlueButtonStyled = styled.button`
  font-family: "BasisGrotesquePro-Medium";
  width: 100%;
  background-color: #316fea;
  color: white;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #1a60eb;
    cursor: pointer;
  }
`;
