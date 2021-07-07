import styled from "styled-components";
import bgImage from "../../img/bg.png";

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
`;

export const StyledTetris = styled.div`
  margin: 0 auto;
  width: 900px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;
