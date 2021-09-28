import React from "react";
import { Component } from "react";
import APIURL from "../../utils/Environment";
import { Redirect } from 'react-router-dom'
import { Counselor } from '../../types'
import CounselorCreate from './CounselorCreate'
import CounselorEdit from './CounselorEdit'
import CounselorTable from './CounselorTable'

type CounselorIndexProps = {
    token: string
    isCounselor: boolean

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
    
    componentDidMount(){
            this.fetchCounselors()
    }

    render(){
        return(
            <div>
        {                   
            this.props.token ? 
            <>
                <CounselorCreate
                    fetchCounselors={this.fetchCounselors}
                    token={this.props.token}
                    />
                {/* <CounselorTable
                    counselors={this.state.counselors}
                    editUpdateCounselor={this.editUpdateCounselor}
                    updateOn={this.updateOn}
                    fetchCounselors={this.fetchCounselors}
                    token={this.props.token}
                />
                {this.state.updateActive && this.state.counselorToUpdate ? (
                    <CounselorEdit
                        counselorToUpdate={this.state.counselorToUpdate}
                        updateOff={this.updateOff}
                        token={this.props.token}
                        fetchCounselors={this.fetchCounselors}
                    />
            ) : (
            <></>
            )} */}
            </>
            : 
            <></>
        }
            </div>
        )
    }
}

export default CounselorIndex