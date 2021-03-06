import styled, { css } from 'styled-components';

const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

export const invertedButtonStyles = css`
  &.inverted {
    background-color: white;
    color: black;
    border: 1px solid black;
    transition: all 0.3s;

    &:hover {
      background-color: black;
      color: white;
      border: none;
    }
`;

export const googleSignInStyles = css`
  background-color: #4285f4;
  color: #fff;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

const getButtonStyles = (props) => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }

  return props.inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px;
  font-size: 15px;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed', 'sans-serif';
  font-weight: bolder;
  border: none;
  cursor: pointer;
  transition: color, background-color, 0.3s;
  display: flex;
  justify-content: center;

  ${getButtonStyles}
`;
