import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * { 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('/fonts/GmarketSansTTFMedium.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  html {
    font-size: 10px;

    @media ${props => props.theme.tablet} {
      font-size: 12px;
    } 

    @media ${props => props.theme.laptop} {
      font-size: 16px;
    } 
  }

  body {
    background-color: #fafafa;
  }

  body, input, a, ol, ul, li, button {
    font-family: 'GmarketSansMedium', 'Sans-serif' !important;
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

  .ant-menu-item {
    font-weight: 600;
  }

  .ant-menu-horizontal > .ant-menu-item a {
    color: #ffffff;
  }

  // antd comment inner padding
  .ant-comment-inner {
    padding: 1rem 0;
  }

  .ant-comment-content-detail {

    & span {
      display: block;
      margin-bottom: .5rem;
    }
  }
`;

export default GlobalStyles;