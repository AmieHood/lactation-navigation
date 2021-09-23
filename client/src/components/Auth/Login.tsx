import React from "react";
import { Component } from "react";
import { Button, Form, FormGroup, Input, Label, Card, CardImg, CardBody, CardTitle } from 'reactstrap'
import { SignupState } from "./Signup";
import logo from '../../assets/dad.jpg'
import { Link } from "react-router-dom";

type LoginProps = {
    updateToken: (newToken: string) => void
    // showLogin: boolean
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
            emailValid: true,
            message: '',
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
             <Card className='card'>
                    <CardImg className='all-cards' top width="100%" src={logo} alt="Card image cap" />
                    <CardBody className='all-cards'>
                        <CardTitle className='card-img-overlay' tag="h1">Log In</CardTitle>
                    </CardBody>
                </Card>

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


// import React from "react";
// import { Component } from "react";
// import { Button, Form, FormGroup, Input, Label, Card, CardImg, CardBody, CardTitle } from 'reactstrap'
// import { SignupState } from "./Signup";
// import logo from '../../assets/dad.jpg'
// import { Link } from "react-router-dom";

// type LoginProps = {
//     updateToken: (newToken: string) => void
// }


// class Login extends Component<LoginProps, SignupState> {
//     constructor(props: LoginProps) {
//         super(props)
//         this.state = {
//             firstName: '',
//             lastName: '', 
//             email: '', 
//             password: '',
//             confirmPassword: '',
//             emailValid: true,
//             message: '',
//         }
//     }

//     handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const target = event.target
//         const value = target.value
//         const name = target.name
//         this.setState({ [name]: value } as unknown as Pick<
//             SignupState,
//             keyof SignupState
//         >)
//     }

//     handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault()
//         let userData = {
//             email: this.state.email,
//             password: this.state.password, 
//         }
//         fetch('http://localhost:3000/user/login', {
//             method: 'POST',
//             body: JSON.stringify(userData),
//             headers: new Headers({
//             'Content-Type': 'application/json',
//             }),
//         })
//             .then(res => res.json())
//             .then(data => {
//             this.props.updateToken(data.sessionToken)
//                 console.log(data)
//             })
//             .catch(err => console.info(err))
//     }

//     render() {
//         return (
//             <div>
//                 <Card className='card'>
//                     <CardImg className='all-cards' top width="100%" src={logo} alt="Card image cap" />
//                     <CardBody className='all-cards'>
//                         <CardTitle className='card-img-overlay' tag="h1">Log In</CardTitle>
//                     </CardBody>
//                 </Card>

//             <Form onSubmit={this.handleSubmit}>
//                 <FormGroup>
//                 <Label htmlFor='email'>Email</Label>
//                 <Input
//                     onChange={this.handleChange}
//                     name='email'
//                     value={this.state.email}
//                     required
//                     type='text'
//                 />
//                 </FormGroup>
//                 <FormGroup>
//                 <Label htmlFor='password'>Password</Label>
//                 <Input
//                     onChange={this.handleChange}
//                     name='password'
//                     value={this.state.password}
//                 />
//                 </FormGroup>
//                 <Button type='submit'>Login</Button>
//             </Form>
//             </div>
//         )
//     }
// }


// export default Login;