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
            emailValid: true,
            message: '', 
        }
        this.handleSubmit = this.handleSubmit.bind(this)
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
                    this.props.fetchUsers()
                    this.props.updateOff()
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
                                    <Button type='submit'>Update Profile</Button>
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