import React from "react";
import { Component } from "react";
import styled from 'styled-components'
import BGImage from '../assets/home-image.jpeg'
import BGImageDesktop from '../assets/home-image-desktop.jpeg'
import { Container1 } from "../App.styles";
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import donate from '../assets/heartmilk.jpg'
import colorlogo from '../assets/colorlogo.png'
import articles from '../assets/articles.jpg'
import becomecounselor from '../assets/becomecounselor.jpg'
import statement from '../assets/statement.jpg'
import sleepresources from '../assets/sleepresources.jpg'
import supplementation from '../assets/supplementation.jpg'
import biologicalnorm from '../assets/biologicalnorm.jpeg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

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

    handleClick = (event: React.FormEvent<HTMLFormElement>) => {

    }
    render(){
        return(
            <>
            <Container1>
                <Background>
                    <Text>
                        <h1>Support Begins Here</h1>
                        <Link to='/findchapter'><Button type='button'>Find a Local Chapter</Button></Link>
                    </Text>
                        <FontAwesomeIcon style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100vw'}} icon={faChevronDown} />
                </Background>
            </Container1>
            
            <div className='row'>
                <div className='column'>
                    <div className='container'>
                        <img className='darken' src={donate} alt='baby surrounded by milk' />
                        <div className="centered"><Link to='/donate'><h1>Donate</h1></Link></div>
                    </div>
                    <div className='container'>
                        <img className='darken' src={colorlogo} alt='Breastfeeding USA logo'/>
                        <div className="centered"><Link to='/aboutus'><h1>About Us</h1></Link></div>
                    </div>
                    <div className='container'>
                        <img className='darken' src={articles} alt='Woman nursing toddler' />
                        <div className="centered"><Link to='/articles' target=''><h1>Articles</h1></Link></div>
                    </div>
                </div>
                <div className='column'>
                    <div className='container'>
                        <img className='darken' src={becomecounselor} alt='Woman helping another woman breastfeed twins'/>
                        <div className="centered"><Link to='/' target=''><h1>Become a Breastfeeding Counselor</h1></Link></div>
                    </div>
                    <div className='container'>
                        <img className='darken' src={statement} alt='Person breastfeeding in field of flowers'/>
                        <div className="centered"><Link to='/statement' target=''><h1>Statement on Breastfeeding</h1></Link></div>
                    </div>
                    <div className='container'>
                        <img className='darken' src={biologicalnorm} alt='toddler nursing'/>
                        <div className="centered"><Link to='/' target=''><h1>The Biological Norm</h1></Link></div>
                    </div>
                </div>
                <div className='column'>
                <div className='container'>
                        <img className='darken' src={sleepresources} alt='sleeping mom and baby'/>
                        <div className="centered"><Link to='/' target=''><h1>Biologically Normal Sleep Habits</h1></Link></div>
                    </div>
                    <div className='container'>
                        <img className='darken' src={supplementation} alt='parent holding supplemental nursing system for nursing parent'/>
                        <div className="centered"><Link to='/statement' target=''><h1>Supplementation</h1></Link></div>
                    </div>
                   
                </div>
            </div>
         
            </>
    
        ) 

    }
} 

export default Home