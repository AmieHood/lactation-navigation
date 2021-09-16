import React from "react";
import { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { SignupState } from "./Signup";

type LoginProps = {
    updateToken: (newToken: string) => void
}


class Login extends Component<LoginProps, SignupState> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '', 
            email: '', 
            password: '',
            confirmPassword: '',
        }
    }
  
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({ [name]: value } as unknown as Pick<
            SignupState,
            keyof SignupState
        >)
    }
  
    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let userData = {
            email: this.state.email,
            password: this.state.password, 
        }
        fetch('http://localhost:3000/user/login', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: new Headers({
            'Content-Type': 'application/json',
            }),
        })
            .then(res => res.json())
            .then(data => {
            this.props.updateToken(data.sessionToken)
                console.log(data)
            })
            .catch(err => console.info(err))
    }
  
    render() {
        return (
            <div>
            <h1>Login</h1>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                <Label htmlFor='email'>Email</Label>
                <Input
                    onChange={this.handleChange}
                    name='email'
                    value={this.state.email}
                    required
                    type='text'
                />
                </FormGroup>
                <FormGroup>
                <Label htmlFor='password'>Password</Label>
                <Input
                    onChange={this.handleChange}
                    name='password'
                    value={this.state.password}
                />
                </FormGroup>
                <Button type='submit'>Login</Button>
            </Form>
            </div>
        )
        }
}


export default Login;