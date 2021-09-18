import React from "react";
import { Component } from "react";
// import {SignupState} from '../Auth/Signup'
import { Form, Button, FormGroup, Label, Input, Container, Col, Row, Media } from 'reactstrap';
import logo from '../../assets/logo.png'
import Counselor from "./Counselor";
// import { useHistory, withRouter } from "react-router-dom";


type UserProps = {
    updateToken: (newToken: string) => void
}

type UserState = {
    firstName: string,
    lastName: string, 
    email: string, 
    password: string,
    confirmPassword: string,
    emailValid: boolean, 
    message: string
}

class User extends Component <UserProps, UserState> {
    constructor(props: UserProps) {
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
        this.handleOnClick= this.handleOnClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleOnClick = () => {
        window.location.replace('/counselor')
        // const { history } = this.props
        // if(history) history.push('/counselor')
            // this.props.history.push({
            //   pathname: "/counselor",
            // //   state: {
            // //     token: token,
            // //   },
            // })
    } 

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value } as unknown as Pick<
            UserState,
            keyof UserState
            >)
            return (
                'Profile updated!'
            )            
        }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        let updatedUserData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName, 
            email: this.state.email, 
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

        console.log(`updatedUserData --> ${updatedUserData.firstName} ${updatedUserData.lastName}`);

        fetch(`http://localhost:3000/user`, {
                    method: 'PUT',
                    body: JSON.stringify(updatedUserData),
                    headers: new Headers ({
                        'Content-Type': 'application/json'
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    this.props.updateToken(data.sessionToken)
                    console.info(data)
                })
                .catch(err => {
                    console.error(err)
                    console.info(err)
                })

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
                            <Label htmlFor="firstName">First Name</Label>
                            <Input type='text' name='firstName' onChange={this.handleChange} value={this.state.firstName}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input type='text' name='lastName' onChange={this.handleChange} value={this.state.lastName}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input required pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$' name='email' title='Please enter a valid email address.' onChange={this.handleChange} value={this.state.email}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input required pattern='^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z]).*$'  title='Password must be at least 8 characters, contain one upper case letter, one lower case letter, and a number.'  name='password' minLength={8} onChange={this.handleChange} value={this.state.password}/>
                        </FormGroup>              
                        <FormGroup>
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input name='confirmPassword' onChange={this.handleChange} value={this.state.confirmPassword}/>
                        </FormGroup>              
                        <FormGroup>
                            <Button type='submit'>Register</Button>
                        </FormGroup>
                        </Form>
                    </Row>
                    <Row>
                        <Button onClick={this.handleOnClick}>Become a Counselor</Button>
                    </Row>
                </Container>
                </div>
            </>
        )
    }
}

export default User