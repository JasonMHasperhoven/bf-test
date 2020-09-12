import styled, { css, keyframes } from 'styled-components';
import { darken } from 'polished';

const barberpole = keyframes`
  100% {
    background-position: 100% 100%;
  }
`;

export default styled.button`
  display: inline-block;
  border: 1px solid;
  border-radius: 5px;
  line-height: 1;
  padding: ${(props) => props.theme.spacing(0.75)}
    ${(props) => props.theme.spacing(1)};
  font-weight: 600;
  text-align: center;

  ${(props) =>
    props.primary &&
    css`
      border-color: ${props.theme.primary};
      background-color: ${props.theme.primary};
      color: white !important;

      &[disabled] {
        border-color: ${props.theme.disabled};
        background-color: ${props.theme.disabled};
      }

      &:not([disabled]):hover,
      &:not([disabled]):focus {
        border-color: ${darken(0.05, props.theme.primary)};
        background-color: ${darken(0.05, props.theme.primary)};
      }

      ${props.loading &&
      css`
        background-image: repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 1rem,
          rgba(0, 0, 0, 0.05) 1rem,
          rgba(0, 0, 0, 0.05) 2rem
        );
      `}
    `}

  ${(props) =>
    props.secondary &&
    css`
      border-color: ${props.theme.border};
      background-color: white;
      color: ${props.theme.primary};

      &[disabled] {
        border-color: ${props.theme.disabled};
        color: ${props.theme.disabled};
      }

      &:not([disabled]):hover,
      &:not([disabled]):focus {
        border-color: ${darken(0.1, props.theme.border)};
      }

      ${props.loading &&
      css`
        background-image: repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 1rem,
          whitesmoke 1rem,
          whitesmoke 2rem
        );
      `}
    `}

  &[disabled] {
    cursor: default;
  }

  &:active:not([disabled]) {
    transform: scale(0.96);
  }

  ${(props) =>
    props.loading &&
    css`
      background-size: 200% 200%;
      animation: ${barberpole} 5s linear infinite;
    `}

  ${(props) => props.css};
`;
