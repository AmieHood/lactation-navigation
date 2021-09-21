import React from "react";
import { Component } from "react";
// import {SignupState} from '../Auth/Signup'
import { Form, Button, FormGroup, Label, Input, Container, Col, Row, Media } from 'reactstrap';
import logo from '../../assets/logo.png'
import APIURL from "../../utils/Environment";
import { Redirect } from 'react-router-dom'
import User from './User'

type CounselorProps = {
    // updateToken: (newToken: string) => void
    token: string
}

type CounselorState = {
    dateAccredited: string
    role: string | null
    token: string
    failed: boolean
}

class Counselor extends Component <CounselorProps, CounselorState> {
    constructor(props: CounselorProps) {
        super(props)
        this.state = {
            token: this.props.token,
            dateAccredited: '',
            role: null,
            failed: false
        }
    }


    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value } as unknown as Pick<
            CounselorState,
            keyof CounselorState
            >)
            return (
                'Congratulations! You are a Breastfeeding Counselor!'
            )
            
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void  => {
        event.preventDefault()
        let newCounselorData = {
            dateAccredited: this.state.dateAccredited
        }
        console.log(`newCounselorData --> ${newCounselorData.dateAccredited}`);

        fetch(`http://localhost:3000/counselor/create`, {
                    method: 'POST',
                    body: JSON.stringify(newCounselorData),
                    headers: new Headers ({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.props.token}`
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    // this.props.token(data.sessionToken)
                    console.info(data)
                })
                .catch(err => {
                    console.error(err)
                    console.info(err)
                })

    }
    async componentDidMount(){
        try {
            let res = await fetch(APIURL + "/")
            let json = await res.json()
            let { user } = json
            if (user?.role == "Counselor"){
                this.setState({role: "Counselor"})
            } else {
                this.setState({ failed: true})
            }
        } catch {
            this.setState({ failed: true})
        }
    }
    render(){
        return(
            this.state.failed 
            ? <Redirect to="/" /> 
                :   !this.state.role 
                ?  <h2> Loading profile details</h2>      
                :   <div>
                    <Container>
                        <Row>
                            <Col><Media top width="100%" src={logo} alt="Card image cap"></Media><h1>Counselor Profile</h1></Col>
                        </Row>
                        <Row>
                            <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="dateAccredited">Date Accredited</Label>
                                <Input name='dateAccredited' title='Please enter a valid email address.' onChange={this.handleChange} value={this.state.dateAccredited}/>
                            </FormGroup>
                                <Button>Create Counselor</Button>
                            </Form>
                        </Row>
                    </Container>
                </div> 
            
        )
    }
}

export default Counselor