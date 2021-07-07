import React from "react";
import { StyledButton } from "./Styles/startbutton";

const StartButton = ({ callback }) => {
  return <StyledButton onClick={callback}>StartGame</StyledButton>;
};

export default StartButton;
