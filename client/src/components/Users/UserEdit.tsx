import React from "react";
import { Component } from "react";
import { Form, Button, FormGroup, Label, Input, Container, Col, Row, Media, Modal, ModalBody, ModalHeader } from 'reactstrap';
import logo from '../../assets/logo.png'
import { User } from '../../types'


type UserEditProps = {
    token: string
    userToUpdate: User
    updateOff: () => void
    fetchUsers: () => void
}

// type User = {
//     firstName: string,
//     lastName: string, 
//     email: string, 
//     password: string,
//     confirmPassword: string,
//     emailValid: boolean, 
//     message: string
// }

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
            User,
            keyof User
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

    // async componentDidMount(){
    //     try {
    //         let res = await fetch(APIURL + "/")
    //         let json = await res.json()
    //         let { user } = json
    //         if (user?.role == "Counselor"){
    //             this.setState({role: "Counselor"})
    //         } else {
    //             this.setState({ failed: true})
    //         }
    //     } catch {
    //         this.setState({ failed: true})
    //     }
    // }

    render(){
        return(
            <>
                <div>
                        <Modal>
                            <ModalHeader>Update Profile</ModalHeader>
                            <ModalBody>
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