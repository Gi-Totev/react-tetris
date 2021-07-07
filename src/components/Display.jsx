import React from "react";
import { StyledDisplay } from "./Styles/display";

const Display = ({ gameOver, text }) => (
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);

export default Display;
