import styled, { createGlobalStyle } from 'styled-components'
import logo from './assets/logo.jpg'

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

    // .container {
    //     margin: 3em;
    // }

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

    .sitebar {
        background-color: transparent !important;
        position: fixed
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
        border: 1px solid white !important;
        border-radius: 20px !important;

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
        background: #ed3b7b;
        transition: .5s;
        transform: scale(.9);
        z-index: -1
    }

    a:hover::before {
        transform: scale(1.1);
        box-shadow: 0 0 15px #ed3b7b
    }

    a: hover {
        color: #ed3b7b;
        box-shadow: 0 0 5px #ed3b7b;
        text-shadow: 0 0 5px #ed3b7b
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

    // .container {
    //     margin-top: 5em;
    // }

    .row {
        display: flex;
        flex-wrap: wrap;
        padding: 0 4px;
    }
    
    // Home page image grid layout
    .column {
    flex: 33%;
    max-width: 33%;
    padding: 0 4px;
    }
    
    .column img {
    margin-top: 8px;
    vertical-align: middle;
    width: 100%;
    }
    
    /* Responsive layout - makes a two column-layout instead of 3 columns */
    @media screen and (max-width: 800px) {
    .column {
        flex: 50%;
        max-width: 50%;
    }
    }
    
    /* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
    @media screen and (max-width: 600px) {
    .column {
        flex: 100%;
        max-width: 100%;
    }
    }

    //darken images too bright for white text
    .darken {
        filter: brightness(75%)
    }

    .container {
        position: relative;
        text-align: center;
    }

    .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }

    .table-responsive {
        style: overflow-x:auto;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        border: 1px solid #ddd;
    }
    
    th, td {
    text-align: left;
    padding: 8px;
    }
    
    tr:nth-child(even){background-color: #f2f2f2}

    .cardsContainer {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-items: center;

        @media only screen and (max-width: 600px){
            max-width: 100vw
        }

    }

    .chapter-cards {
        background-color: #3b054f !important;
        // background-image: url(${logo}) !important;
        // background-size: cover;
        // background-repeat: no-repeat;
        // height: 100vh;
        // width: 100vw;
        margin: auto;
        justify-content: center;
        align-items: center;
        margin: 1em;
        border-radius: 10px
    }

`

export const Container1 = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #ed3b7b;
`