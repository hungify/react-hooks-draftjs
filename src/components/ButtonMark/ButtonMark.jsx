import React from "react";
import styled from "styled-components";
export const Button = styled.button`
  color: ${(props) => (props.active ? "#00ad9e" : "#616c7a")};
  background-color: ${(props) => (props.active ? "#rgba(0, 173, 158, 0.1)" : "transparent")};
  border: none;
  padding: 0.25rem;
  height: 2rem;
  width: 2rem;
  margin: 2px;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  transition: 250ms;
  &:hover {
    color: ${(props) => (props.active ? "#00ad9e" : "#0e1e25")};
    background-color: ${(props) =>
      props.active ? "rgba(0, 173, 158, 0.2)" : "rgba(14, 30, 37, 0.05)"};
  }
  &:active {
    color: ${(props) => (props.active ? "#00ad9e" : "#0e1e25")};
    background-color: ${(props) =>
      props.active ? "rgba(0, 173, 158, 0.3)" : "rgba(14, 30, 37, 0.1)"};
  }
`;
export default function ButtonMark({ icon, active, onToggle, style }) {
  const handleToggle = (e) => {
    e.preventDefault();
    onToggle(style, e, !active);
  };

  return (
    <Button active={active} onMouseDown={handleToggle}>
      {icon}
    </Button>
  );
}
