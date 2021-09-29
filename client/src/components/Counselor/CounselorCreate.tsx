import React, { Component } from "react";
import { Form, Button, FormGroup, Label, Input, Card, CardBody, CardImg, CardTitle, Alert } from 'reactstrap';
import logo from '../../assets/beach.jpg'
import { Counselor } from '../../types'
import { Redirect } from 'react-router-dom'


let dateInput = {
    width: '50%'
}

type CounselorProps = {
    fetchCounselors: () => void
    token: string
}

class CounselorCreate extends Component <CounselorProps, Counselor> {
    constructor(props: CounselorProps) {
        super(props)
        this.state = {
            token: this.props.token,
            dateAccredited: '',
            role: ''
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
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void  => {
        console.info('submit function')
        event.preventDefault()
        let newCounselorData = {
            dateAccredited: this.state.dateAccredited,
            role: this.state.role
        }
        console.info(newCounselorData)

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
                    this.setState({
                        dateAccredited: '',
                        role: 'Counselor'
                    })
                    // this.props.fetchCounselors()
                    console.info(data.user)
                    console.info(data.role)
                    console.info(data.dateAccredited)

                    
                })
                .catch(err => {
                    console.error(err)
                })

    }
    
    render(){
        return(
                <div>
                    <Card className='card'>
                        <CardImg className='all-cards' top width="100%" src={logo} alt="Card image cap" />
                        <CardBody className='all-cards'>
                            <CardTitle className='card-img-overlay' tag="h1">Become a Breastfeeding USA Counselor</CardTitle>
                        </CardBody>
                    </Card>
                    <p style={{textAlign: 'center', color: '#3b054f'}}>Already a Breastfeeding USA Counselor? Add your accreditation date here!</p>
                    <Form onSubmit={this.handleSubmit}>
                    <FormGroup className='form-styling'>
                        <Label htmlFor="dateAccredited">Date Accredited</Label>
                        <Input style={dateInput} type='date' name='dateAccredited' onChange={this.handleChange} value={this.state.dateAccredited}/>
                        <Button className='form-styling'>Add Date</Button>
                    </FormGroup>
                    </Form>
                    {this.state.role == 'Counselor' ? (
            <>
                {window.confirm('Congratulations! You are a Breastfeeding Counselor!')}
                <Redirect push to="/portal" />
            </>
            ) : (
            <></>
            )}
                </div> 
            )
        }
    }
    
    export default CounselorCreate