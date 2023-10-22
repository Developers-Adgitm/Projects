import styled from "styled-components";
export const Button = styled.button`
  color: white;
  padding: 17px 30px;
  background: black;
  border-radius: 8px;
  min-width: 260px;
  font-size: 28px;
  margin-left: 97px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: 0.4s background ease-in;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
    transition: 0.3s background ease-in;
  }
`;
export const OutlineButton = styled(Button)`
  background-color: white;
  border: 1px solid black;
  color: black;
  &:hover {
    background-color: black;
    border: 1px solid transparent;
    color: white;
  }
`;
