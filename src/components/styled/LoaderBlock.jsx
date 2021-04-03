import styled from "@emotion/styled";

export const LoaderBlock = styled.div`
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  cursor: wait;
  width: 100vw;
  height: 100vh;
  position: fixed;
  /* z-index: 10; */
  z-index: 9999;
  background: rgba(255, 255, 255, 0.724);
  animation: 0.3s 0.1s fade-opacity 1 forwards;
  @keyframes fade-opacity {
    to {
      opacity: 1;
    }
  }
`;
