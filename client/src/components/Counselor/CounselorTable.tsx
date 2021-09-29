import React, { Component } from 'react'
import { Button, Table } from 'reactstrap'
import { Counselor } from '../../types'

type CounselorTableProps = {
    token: string
    counselors: Counselor[]
    editUpdateCounselor: (counselor: Counselor) => void
    updateOn: () => void
    fetchCounselors: () => void
}

class CounselorTable extends Component<CounselorTableProps, {}> {
    constructor(props: CounselorTableProps){
        super(props)
        this.state = {
            failed: false
        }
    }
    deleteCounselor = (counselor: Counselor) => {
        fetch(`http://localhost:3000/counselor/${counselor.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.token}`,
            }),
        })
            .then(() => this.props.fetchCounselors())
}

    counselorMapper = (): JSX.Element[] => {
        return this.props.counselors.map((counselor: Counselor, index: number) => {
            return (
                <tr key={index}>
                <td>{counselor.dateAccredited}</td>
                <td>{counselor.role}</td>
                <td>
                    <Button
                        color='warning'
                        onClick={() => {
                            this.props.editUpdateCounselor(counselor)
                            this.props.updateOn()
                        }}
                    >
                        Update
                    </Button>
                    <Button
                        color='danger'
                        onClick={() => {
                            this.deleteCounselor(counselor)
                        }}
                    >
                        Delete
                    </Button>
                </td>
                </tr>
            )
        })
    }


    render() {

        return (   
            <>
            <h3>Counselor List</h3>
            <hr />
            <Table responsive hover>
            <thead>
            <tr>
            <th>Date Accredited</th>
            <th>Role</th>
            </tr>
            </thead>
            <tbody>{this.counselorMapper()}</tbody>
            </Table>
            </>
            )
    }
    }

    export default CounselorTable