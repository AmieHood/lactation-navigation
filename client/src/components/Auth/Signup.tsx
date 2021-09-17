import React from "react";
import { Component } from "react";
import { Form, Input, Button, Label, FormGroup, Alert } from 'reactstrap'

type SignupProps = {
    updateToken: (newToken: string) => void
}

export type SignupState = {
    firstName: string,
    lastName: string, 
    email: string, 
    password: string,
    confirmPassword: string,
    emailValid: boolean, 
    message: string
}

class Signup extends Component <SignupProps, SignupState>{
    constructor(props: SignupProps) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '', 
            email: '', 
            password: '',
            confirmPassword: '',
            emailValid: false,
            message: ''
        }

        this.handleChange= this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value } as unknown as Pick<
            SignupState,
            keyof SignupState
            >)
            return (
                'You are registered!'
            )
            
            console.info(this.state)
            
        }
    
    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        console.info('fetch?')
        event.preventDefault()
        let newUserData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        }
        console.log(`newUserData --> ${newUserData.email} ${newUserData.password}`);

        fetch(`http://localhost:3000/user/signup`, {
                    method: 'POST',
                    body: JSON.stringify(newUserData),
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
                    <h1>Sign Up</h1>
                    <Form onSubmit={this.handleSubmit} >
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
                {/* </CardBody>
            </Card> */}
            </div>
            </>
        )
    }
}
export default Signup