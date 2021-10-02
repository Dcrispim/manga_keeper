import styled from "styled-components";

export const IconButtonContainer = styled.div<{ color?: string }>`
  display: flex;
  flex-direction: column;
  height: 96px;
  width: 96px;
  background-color: ${({ color }) => color};
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  cursor: pointer;
  input {
    display: none;
  }
  img {
    width: 48px;
    height: 48px;
    object-fit: cover;
  }
`;
