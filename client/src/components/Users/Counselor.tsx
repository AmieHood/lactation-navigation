import React from "react";
import { Component } from "react";
// import {SignupState} from '../Auth/Signup'
import { Form, Button, FormGroup, Label, Input, Container, Col, Row, Media } from 'reactstrap';
import logo from '../../assets/logo.png'
import User from './User'

type CounselorProps = {
    // onChange: (string: string) => void
}

class Counselor extends Component <CounselorProps, {}> {
    constructor(props: CounselorProps) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '', 
            email: '', 
            password: '',
            confirmPassword: '',
            emailValid: true,
            message: '', 
        }
    }
    render(){
        return(
            <>
                <div>
                <Container>
                    <Row>
                        <Col><Media top width="100%" src={logo} alt="Card image cap"></Media><h1>User Profile</h1></Col>
                    </Row>
                    <Row>
                        <Form>
                            <FormGroup>
                                <Label htmlFor='email'></Label>
                                <Input placeholder='Insert current email here' />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='password'></Label>
                                <Input placeholder='Insert current password here' />
                            </FormGroup>
                            <Button>Submit Edit</Button>
                        </Form>
                    </Row>
                </Container>
                </div>
            </>
        )
    }
}

export default Counselor