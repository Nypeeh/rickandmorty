import styled, { css } from 'styled-components'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
}

export const Container = styled.div<ContainerProps>`
  z-index: 2;
  background-color: white;
  width: 95%;
  max-width: 500px;
  height: 50px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.5);
  border: 3px solid transparent;
  transition: border-color 0.2s ease;

  > svg {
    color: #4b4b4b;
    transition: color 0.2s ease;
  }

  input {
    border: 0;
    margin-left: 0.5rem;
    flex: 1;
    font-size: 1.1rem;
  }

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: #159fed;

      > svg {
        color: #159fed;
      }
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      > svg {
        color: #159fed;
      }
    `}
`
