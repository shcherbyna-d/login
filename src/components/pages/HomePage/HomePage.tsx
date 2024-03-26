import styled from "styled-components";
import { useAuth } from "../../../providers/AuthProvider";

const LogOutButton = styled.button`
  height: 40px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50px;
  right: 50px;
  cursor: pointer;
`;

const HomePage = () => {
  const authContextValue = useAuth();

  const handleLogOut = async () => {
    authContextValue?.onLogout().catch((error) => {
      // An error happened.
    });
  };

  return (
    <section>
      <h1>Home Page</h1>
      <h4>
        Hello,{" "}
        {authContextValue?.user?.displayName || authContextValue?.user?.email}!
      </h4>
      <LogOutButton type="button" onClick={handleLogOut}>
        Log out
      </LogOutButton>
    </section>
  );
};

export default HomePage;
