import { darken, lighten } from 'polished';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    text-size-adjust: 100%;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    background: ${(props) => props.theme.bodyBg};
    color: ${(props) => props.theme.primaryTextColor};

    &:before {
      display: none;
    }
  }

  html,
  input,
  textarea,
  button {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
  }

  article,
  aside,
  footer,
  header,
  main,
  nav,
  section,
  textarea {
    display: block;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    line-height: 1.2;
    text-rendering: optimizeLegibility;
  }

  h1,
  h2,
  h3 {
    margin-bottom: 1rem;
  }

  p {
    margin-top: 0;
    margin-bottom: ${(props) => props.theme.spacing()};

    &:last-child {
      margin-bottom: 0;
    }
  }

  ol,
  ul,
  dl {
    margin-top: 0;
    margin-bottom: ${(props) => props.theme.spacing()};
    padding-left: ${(props) => props.theme.spacing()};

    &:last-child {
      margin-bottom: 0;
    }
  }

  a,
  button,
  label {
    cursor: pointer;
    transition: all .2s;

    &:active:not([disabled]) {
      filter: brightness(90%);
    }
  }

  a {
    background-color: transparent;
    color: ${(props) => props.theme.linkColor};

    &:hover,
    &:focus,
    &:active {
      outline: 0;
      color: ${(props) => darken(0.1, props.theme.linkColor)};
    }

    &,
    &:active,
    &:visited,
    &:hover {
      text-decoration: none;
    }
  }

  button {
    border: 0;
    outline: 0;
    padding: 0;
  }

  label {
    display: inline-block;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
  }

  th {
    text-align: left;
  }

  img {
    box-sizing: content-box;
    border: 0;
  }

  hr {
    box-sizing: content-box;
    height: 0;
  }

  em {
    font-weight: 600;
    font-style: normal;
  }

  strong {
    font-weight: 600;
    font-style: normal;
  }

  button,
  input,
  select,
  optgroup,
  textarea {
    margin: 0;
    font: inherit;
    line-height: inherit;
    color: inherit;
  }

  button {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  input,
  textarea {
    outline: 0;
  }

  button,
  html input[type=button],
  input[type=reset],
  input[type=submit] {
    cursor: pointer;
    -webkit-appearance: button;
  }

  [readonly],
  button[disabled],
  html input[disabled] {
    cursor: default;
  }

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  input {
    line-height: normal;

    &:invalid {
      box-shadow: none;
    }
  }

  input[type=text],
  input[type=tel],
  input[type=number],
  input[type=email],
  input[type=search]::-webkit-search-cancel-button,
  input[type=search]::-webkit-search-decoration,
  input[type=search]::-webkit-search-results-button,
  input[type=search]::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  input[type=checkbox],
  input[type=radio] {
    padding: 0;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }

  input[type=search] {
    box-sizing: content-box;
    -webkit-appearance: textfield;
  }

  input[type=text][disabled]
  input[type=email][disabled]
  input[type=password][disabled] {
    -webkit-text-fill-color: ${(props) => props.theme.primaryTextColor3};
  }

  ${
    '' /* input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-box-shadow: inset 0 0 0 100px #fff;
  } */
  }

  textarea {
    vertical-align: top;
    overflow: auto;
    resize: vertical;
  }

  ::-webkit-input-placeholder {
    color: ${(props) => lighten(0.3, props.theme.primaryTextColor)};
    -webkit-font-smoothing: antialiased;
  }

  :-moz-placeholder {
    color: ${(props) => lighten(0.3, props.theme.primaryTextColor)};
    opacity: 1;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
  }

  ::-moz-placeholder {
    color: ${(props) => lighten(0.3, props.theme.primaryTextColor)};
    opacity: 1;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
  }

  :-ms-input-placeholder {
    color: ${(props) => lighten(0.3, props.theme.primaryTextColor)};
    -webkit-font-smoothing: antialiased;
  }
`;
