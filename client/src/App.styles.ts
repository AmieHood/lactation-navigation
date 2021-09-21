import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }

    body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        color: white;
        background-color: #999999;
        // background-color: #3B054F;
    }

    button {
        margin: 1em;
    }

    * {
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }
`

export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #218e8a;
`