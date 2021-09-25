import React from "react";
import { Component } from "react";
import { Form, Button, FormGroup, Label, Input, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { User } from '../../types'
import logo from '../../assets/info.jpg'


type ProfileEditProps = {
    token: string
    userToUpdate: User 
}



type ProfileEditState = {
    emailValid: boolean
    message: string
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string 
}

class ProfileEdit extends Component <ProfileEditProps, ProfileEditState> {
    constructor(props: ProfileEditProps) {
        super(props)
        this.state = {
            emailValid: true,
            message: '',
            firstName: this.props.userToUpdate.firstName, 
            lastName: this.props.userToUpdate.lastName,
            email: this.props.userToUpdate.email, 
            password: this.props.userToUpdate.password,
            confirmPassword: this.props.userToUpdate.confirmPassword,
        }
        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    // handleChange = (event: React.ChangeEvent<HTMLInputElement>, keyName: string) => {
    //     let change = Object.assign(
    //         this.props.userToUpdate, // old data
    //         {[keyName]: event.target.value}) // new k:v pair
    //     this.setState({ userToUpdate: change})// update state  
    // }

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

        fetch(`http://localhost:3000/user/${this.props.userToUpdate.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(updatedUserData),
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
                        <Input type='text' name='firstName' value={this.state.firstName} onChange={(e) => this.setState({firstName: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input type='text' name='lastName' value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input type='text' name='email' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input type='password' name='password' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input type='password' name='confirmPassword' value={this.state.confirmPassword} onChange={(e) => this.setState({confirmPassword: e.target.value})}/>
                    </FormGroup>
                        <Button>Update Profile</Button>
                    </Form>
                </div> 
            </>
        )
    }
}

export default ProfileEdit