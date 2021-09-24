import React from "react";
import { Component } from "react";
import { Form, Button, FormGroup, Label, Input, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { User } from '../../types'
import logo from '../../assets/info.jpg'


type ProfileEditProps = {
    token: string
    user: User
}


type ProfileEditState = {
    emailValid: boolean
    updatedUser: User
    message: string
}

class ProfileEdit extends Component <ProfileEditProps, ProfileEditState> {
    constructor(props: ProfileEditProps) {
        super(props)
        this.state = {
            emailValid: true,
            message: '',
            updatedUser: this.props.user
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>, keyName: string) => {
        let change = Object.assign(
            this.state.updatedUser, // old data
            {[keyName]: event.target.value}) // new k:v pair
        this.setState({ updatedUser: change})// update state  
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        console.log(`updatedUserData --> ${this.state.updatedUser.firstName} ${this.state.updatedUser.lastName}`);

        fetch(`http://localhost:3000/user/${this.props.user.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(this.state.updatedUser),
                    headers: new Headers ({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.props.token}`
                    }),
                })
                .then(res => res.json())
                .then(data => {
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
                <Card className='card'>
                        <CardImg className='all-cards' top width="100%" src={logo} alt="Card image cap" />
                        <CardBody className='all-cards'>
                            <CardTitle className='card-img-overlay' tag="h1">Profile</CardTitle>
                        </CardBody>
                    </Card>
                    <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input type='date' name='firstName' onChange={(e) => this.handleChange(e, "firstName")} value={this.state.updatedUser.firstName}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="lastName">First Name</Label>
                        <Input type='date' name='lastName' onChange={(e) => this.handleChange(e, "lastName")} value={this.state.updatedUser.lastName}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">First Name</Label>
                        <Input type='date' name='email' onChange={(e) => this.handleChange(e, "email")} value={this.state.updatedUser.email}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">First Name</Label>
                        <Input type='date' name='password' onChange={(e) => this.handleChange(e, "password")} value={this.state.updatedUser.password}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="confirmPassword">First Name</Label>
                        <Input type='date' name='confirmPassword' onChange={(e) => this.handleChange(e, "confirmPassword")} value={this.state.updatedUser.confirmPassword}/>
                    </FormGroup>
                        <Button>Update Profile</Button>
                    </Form>
                        {/* <Modal isOpen={true}>
                            <ModalHeader>Update Profile</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input type='text' name='firstName' onChange={this.handleChange} value={this.state.firstName}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input type='text' name='lastName' onChange={this.handleChange} value={this.state.lastName}/>
                                </FormGroup>
                                <FormGroup>
                                    <Button type='submit'>Update Profile</Button>
                                </FormGroup>
                                </Form>

                            </ModalBody>
                        </Modal> */}
                </div>
            </>
        )
    }
}

export default ProfileEdit