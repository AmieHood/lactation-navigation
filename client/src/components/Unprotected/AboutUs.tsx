import React, { Component } from 'react'
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap'
import logo from '../../assets/colorlogo.png'


type AboutUsProps = {
}

type AboutUsState = {
}


class AboutUs extends Component<AboutUsProps, AboutUsState> {
    constructor(props: AboutUsProps) {
        super(props)
        
    }

    
    componentDidMount = (): void => {
    }
    
    render() {
        return (
            <div>
            <Card className='card'>
                <CardImg className='all-cards' top width="50%" src={logo} alt="Card image cap" />
                <CardBody className='all-cards'>
                    <CardTitle className='card-img-overlay' tag="h1">About Us</CardTitle>
                </CardBody>
            </Card>
            </div>
        )
    }
}


export default AboutUs
