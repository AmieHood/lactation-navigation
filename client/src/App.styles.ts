import styled, { createGlobalStyle } from 'styled-components'
import BGImage from './assets/home-image.jpeg'

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }

    body {
        background-image: url(${BGImage});
        background-size: cover;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
        color: white
    }

    * {
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }
`