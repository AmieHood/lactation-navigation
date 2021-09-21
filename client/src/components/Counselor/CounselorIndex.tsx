import React from "react";
import { Component } from "react";
import { Form, Button, FormGroup, Label, Input, Container, Col, Row, Media } from 'reactstrap';
import logo from '../../assets/logo.png'
import APIURL from "../../utils/Environment";
import { Redirect } from 'react-router-dom'
import User from '../Users/User'
import { Counselor } from '../../types'
import CounselorCreate from './CounselorCreate'
import CounselorEdit from './CounselorEdit'
import CounselorTable from './CounselorTable'

type CounselorIndexProps = {
    token: string
}

type CounselorIndexState = {
    counselors: Counselor[]
    updateActive: boolean
    counselorToUpdate: Counselor | null
}

class CounselorIndex extends Component <CounselorIndexProps, CounselorIndexState> {
    constructor(props: CounselorIndexProps) {
        super(props)
        this.state = {
            counselors: [],
            updateActive: false,
            counselorToUpdate: null
        }
    }

    fetchCounselors = (): void => {
        fetch(`http://localhost:3000/counselor/all`, {
                    method: 'GET',
                    // body: JSON.stringify(newCounselorData),
                    headers: new Headers ({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.props.token}`
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    this.setState({ counselors: data})
                    console.info(data)
                })
                .catch(err => {
                    console.error(err)
                    console.info(err)
                })
    }

    // handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const target = event.target
    //     const value = target.value
    //     const name = target.name
    //     this.setState({
    //         [name]: value } as unknown as Pick<
    //         CounselorState,
    //         keyof CounselorState
    //         >)
    //         return (
    //             'Congratulations! You are a Breastfeeding Counselor!'
    //         )
            
    // }


    editUpdateCounselor = (counselor: Counselor): void => {
        this.setState({ counselorToUpdate: counselor})
        console.log(counselor);
    }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    componentDidMount = (): void => {
        this.fetchCounselors()
    }
    
    render(){
        return(
               // this.state.failed 
            // ? <Redirect to="/" /> 
            //     :   !this.state.role 
            //     ?  <h2> Loading profile details</h2>      
            //     : 
            <div>
            <Container>
                <Row>
                    <Col md='3'>
                        <CounselorCreate
                            fetchCounselors={this.fetchCounselors}
                            token={this.props.token}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md='9'>
                        <CounselorTable
                            counselors={this.state.counselors}
                            editUpdateCounselor={this.editUpdateCounselor}
                            updateOn={this.updateOn}
                            fetchCounselors={this.fetchCounselors}
                            token={this.props.token}
                        />
                    </Col>
                    {/* won't show up until workout is set (originally set to null)
                    - null doesn't guarantee workout has been set */}
                    {this.state.updateActive && this.state.counselorToUpdate ? (
                        <CounselorEdit
                            counselorToUpdate={this.state.counselorToUpdate}
                            updateOff={this.updateOff}
                            token={this.props.token}
                            fetchCounselors={this.fetchCounselors}
                        />
                    ) : (
                        <></>
                    )}
                </Row>
            </Container>
            </div> 
            
        )
    }
}

export default CounselorIndex