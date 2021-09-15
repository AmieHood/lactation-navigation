import React from "react";
import { Component } from "react";
import styled from 'styled-components'
import BGImage from '../assets/home-image.jpeg'
import BGImageDesktop from '../assets/home-image-desktop.jpeg'
import { Container } from "../App.styles";
import { Button } from 'reactstrap';

const Background = styled.div`
    background-image: url(${BGImageDesktop});
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    margin: auto;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
        background-image: url(${BGImage});
    }


`

const Text = styled.div`
    margin: auto;
    margin-top: 30em;
    width: 50vw;
    padding: 1em;
    justify-content: center;
    align-items: center;
    text-align: center;
    
`


class Home extends Component {
    render(){
        return(
            <>
            <Container>
                <Background>
                    <Text>
                        <h1>Support Begins Here</h1>
                        <hr />
                        <Button type='button'>Log In</Button>
                    </Text>
                </Background>
            </Container>
            </>
        )

    }
} 

export default Home