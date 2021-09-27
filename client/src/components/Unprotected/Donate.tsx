import React, { Component } from 'react'
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap'
import logo from '../../assets/heartmilk.jpg'

type DonateProps = {
}

type DonateState = {
}


class Donate extends Component<DonateProps, DonateState> {
    
    render() {
        return (
            <div>
            <Card className='card'>
                <CardImg className='all-cards' top width="50%" src={logo} alt="Card image cap" />
                <CardBody className='all-cards'>
                    <CardTitle className='card-img-overlay' tag="h1">Donate</CardTitle>
                </CardBody>
            </Card>
            </div>
        )
    }
}

export default Donate