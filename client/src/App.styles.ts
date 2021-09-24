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
    }

    .container {
        margin: 3em;
    }

    .card {
        background-color: transparent !important;
        text-align: center;
        border: none
    }

    .card-img-overlay {
        display: flex;
        align-items: center;
        justify-content: center
    }

    .modal-header {
        background-color: #999999 !important;
    }

    .modal-body {
        background-color: #999999 !important;
    }

    button {
        margin: 1em;
        background-color: transparent !important;
        border: 1px solid white !important
    }

    button:hover {
        background-color: #999999 !important
    }

    a {
        color: white !important;
        text-decoration: none !important;
        transition: .5s
    }

    a::before {
        background: #ffee10;
        transition: .5s;
        transform: scale(.9);
        z-index: -1
    }

    a:hover::before {
        transform: scale(1.1);
        box-shadow: 0 0 15px #ffee10
    }

    a: hover {
        color: #ffee10;
        box-shadow: 0 0 5px #ffee10;
        text-shadow: 0 0 5px #ffee10
    }

    * {
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }

    .message {
        position: fixed !important;
        top: 0px !important;
        left: 0px !important
        width: 100%;
        z-index: 9999 !important;
        border-radius: 0px !important;
        margin-top: 3em
    }

    .chapter {
        filter: brightness(50%) !important;
    }
`

export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #218e8a;
`