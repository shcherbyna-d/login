import React from "react";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 180px;
  padding-bottom: 50px;

  @media (max-width: 480px) {
    padding-top: 100px;
  }
`;

const LoginFormWrapper = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutContainer>
      <LoginFormWrapper>{children} </LoginFormWrapper>
    </LayoutContainer>
  );
};

export default LoginLayout;
