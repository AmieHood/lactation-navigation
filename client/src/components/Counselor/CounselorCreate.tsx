import React, { Component } from "react";
import { Form, Button, FormGroup, Label, Input, Container, Col, Row, Media, Card, CardBody, CardImg, CardTitle } from 'reactstrap';
import logo from '../../assets/beach.jpg'
import { Counselor } from '../../types'

type CounselorProps = {
    fetchCounselors: () => void
    token: string
}

// type CounselorState = {
//     dateAccredited: string
//     role: string | null
//     token: string
// }

class CounselorCreate extends Component <CounselorProps, Counselor> {
    constructor(props: CounselorProps) {
        super(props)
        this.state = {
            token: this.props.token,
            dateAccredited: '',
            role: 'Counselor'
        }
    }


    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value } as unknown as Pick<
            Counselor,
            keyof Counselor
            >)
            return (
                'Breastfeeding Counselor Created!'
            )
            
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void  => {
        event.preventDefault()
        let newCounselorData = {
            dateAccredited: this.state.dateAccredited,
            role: this.state.role
        }
        console.log(`newCounselorData --> ${newCounselorData.dateAccredited}`);

        fetch(`http://localhost:3000/counselor/create`, {
                    method: 'POST',
                    body: JSON.stringify(newCounselorData),
                    headers: new Headers ({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.props.token}`
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    console.info(data)
                    this.setState({
                        dateAccredited: '',
                        role: ''
                    })
                    this.props.fetchCounselors()
                })
                .catch(err => {
                    console.error(err)
                    console.info(err)
                })

    }
    
    render(){
        return(
                <div>
                    <Card className='card'>
                        <CardImg className='all-cards' top width="100%" src={logo} alt="Card image cap" />
                        <CardBody className='all-cards'>
                            <CardTitle className='card-img-overlay' tag="h1">Create New Counselor</CardTitle>
                        </CardBody>
                    </Card>
                            <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="dateAccredited">Date Accredited</Label>
                                <Input type='date' name='dateAccredited' onChange={this.handleChange} value={this.state.dateAccredited}/>
                                {/* <Label htmlFor="dateAccredited"></Label>
                                <Input placeholder='Date Accredited' type='text' name='dateAccredited' title='Please enter a date in yyyy-mm-dd format.' onChange={this.handleChange} value={this.state.dateAccredited}/> */}
                            </FormGroup>
                                <Button>Create Counselor</Button>
                            </Form>
                </div> 
            
            )
        }
    }
    
    export default CounselorCreate