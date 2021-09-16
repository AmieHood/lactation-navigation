import React from "react";
import { Component } from "react";
import { Form, Input, Button, Label, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, FormGroup } from 'reactstrap'

// const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

type SignupProps = {
    updateToken: (newToken: string) => void
}

export type SignupState = {
    firstName: string,
    lastName: string, 
    email: string, 
    password: string,
    confirmPassword: string,
    // errors: {
    //     email: string,
    //     password: string
    // }
}

class Signup extends Component <SignupProps, SignupState>{
    constructor(props: SignupProps) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '', 
            email: '', 
            password: '',
            confirmPassword: ''
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
            console.info(this.state)
        }
        // error handling
        // let errors = this.state.errors;
        // switch (name) {
        //     case 'email':
        //         errors.email = Regex.test(value)? '': 'Email is not valid!';
        //         break;
        //     case 'password':
        //         errors.password = value.length < 8 ? 'Password must be eight characters long!': '';
        //         break;
        //     default:
        //         break;
        // }
        // this.setState(Object.assign(this.state, { errors, [name]: value}))
        // console.info(this.state.errors)
    
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
            {/* <Card>
                <CardImg top width="100%" src="../assets/beach.jpg" alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h5">Card title</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <Button>Button</Button> */}
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
                            <Input type='email' name='email' onChange={this.handleChange} value={this.state.email}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type='password'  name='password' onChange={this.handleChange} value={this.state.password}/>
                        </FormGroup>              
                        <FormGroup>
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input type='password' name='confirmPassword' onChange={this.handleChange} value={this.state.confirmPassword}/>
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