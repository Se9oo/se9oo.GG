import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * { 
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 10px;

    @media ${props => props.theme.laptop} {
      font-size: 16px;
    }
  }

  body {
    box-sizing: border-box;
    font-family: 'Spoqa Han Sans', 'Sans-serif' !important;
  }

  #__next {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  a {
    text-decoration:none;
    color:inherit;
    cursor: pointer;
  }

  ol, ul, li {
    list-style: none;
  }

  img {
    display: block;
  }

  input, button {
    background-color: transparent;
  }

  input, a, ol, ul, li, button {
    font-family: 'Spoqa Han Sans', 'Sans-serif';
  }

  .ant-menu-item {
    font-weight: 600;
  }

  .ant-menu-horizontal > .ant-menu-item a {
    color: #ffffff;
  }
`;

export default GlobalStyles;