import React from "react";
import { Component } from "react";
import { Form, Button, FormGroup, Label, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { User } from '../../types'


type UserEditProps = {
    token: string
    userToUpdate: User
    updateOff: () => void
    fetchUsers: () => void
}

class UserEdit extends Component <UserEditProps, User> {
    constructor(props: UserEditProps) {
        super(props)
        this.state = {
            firstName: this.props.userToUpdate.firstName,
            lastName: this.props.userToUpdate.lastName, 
            email: this.props.userToUpdate.email, 
            password: this.props.userToUpdate.password,
            confirmPassword: this.props.userToUpdate.confirmPassword,
            userCity: this.props.userToUpdate.userCity,
            userState: this.props.userToUpdate.userState,
            userPhone: this.props.userToUpdate.userPhone,
            emailValid: true,
            message: '', 
            Counselor: {
                dateAccredited: '',
                role: '',
                token: '',
                id: 0,
              },
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleCancel = () => {
        this.props.updateOff()
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value } as unknown as Pick<
            User,
            keyof User
            >)         
        }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        let updatedUserData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName, 
            email: this.state.email, 
            userCity: this.state.userCity,
            userState: this.state.userState,
            userPhone: this.state.userPhone,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

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
                    this.props.fetchUsers()
                    this.props.updateOff()
                })
                .catch(err => {
                    console.error(err)
                })

    }

    render(){
        return(
            <>
                <div>
                        <Modal isOpen={true}>
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
                                    <Label htmlFor="userCity">City</Label>
                                    <Input type='text' name='userCity' onChange={this.handleChange} value={this.state.userCity}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="userState">State</Label>
                                    <Input type='text' name='userState' onChange={this.handleChange} value={this.state.userState}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="userPhone">Phone</Label>
                                    <Input type='text' name='userPhone' onChange={this.handleChange} value={this.state.userPhone}/>
                                </FormGroup>
                                <FormGroup>
                                    <Button outline color="success" type='submit'>Update Profile</Button>
                                    <Button outline color="danger" onClick={this.handleCancel}>Cancel</Button>
                                </FormGroup>
                                </Form>

                            </ModalBody>
                        </Modal>
                </div>
            </>
        )
    }
}

export default UserEdit