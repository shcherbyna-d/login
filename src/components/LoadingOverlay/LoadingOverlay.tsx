import styled from "styled-components";

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay = (props: LoadingOverlayProps) => {
  const { isLoading } = props;

  return (
    <>
      {isLoading && (
        <Overlay>
          <LoadingText>Loading...</LoadingText>
        </Overlay>
      )}
    </>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* In real life this index will be presetted in the palette file */
`;

const LoadingText = styled.div`
  font-size: 20px;
  color: #333;
`;

export default LoadingOverlay;
