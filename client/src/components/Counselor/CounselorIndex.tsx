import React from "react";
import { Component } from "react";
import { Container, Col, Row } from 'reactstrap';
import APIURL from "../../utils/Environment";
import { Redirect } from 'react-router-dom'
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
    failed: boolean
    role: string | null
}

class CounselorIndex extends Component <CounselorIndexProps, CounselorIndexState> {
    constructor(props: CounselorIndexProps) {
        super(props)
        this.state = {
            counselors: [],
            updateActive: false,
            counselorToUpdate: null,
            failed: false,
            role: ''
        }
    }

    fetchCounselors = (): void => {
        fetch(`http://localhost:3000/counselor/all`, {
                    method: 'GET',
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
    
    async componentDidMount(){
            console.info('working?')
            console.info(`${APIURL}/counselor`)
            try {
                    let res = await fetch(`${APIURL}/counselor/validate`, {
                        headers: new Headers ({
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.props.token}`
                        })
                    })
                        let json = await res.json()
                        let Counselor = json
                        console.info(Counselor)
                        console.info(json)
                    if (Counselor == null){
                        this.setState({failed: true})
                        return
                    } else {
                        this.setState({ failed: false})
                        this.fetchCounselors()
        }
    } catch (error) {
        console.error(error)
        this.setState({ failed: true})
    }
    }


    
    render(){
        return(
            <div>
            <Container>
                <Row>
                    <Col md='9'>
                        <CounselorCreate
                            fetchCounselors={this.fetchCounselors}
                            token={this.props.token}
                            />
                    </Col>
                </Row>
            </Container>
        {                   
            this.state.failed
            ? <Redirect to="/counselor" /> 
            :   
            <Container>
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
        }
            </div>
        )
    }
}

export default CounselorIndex