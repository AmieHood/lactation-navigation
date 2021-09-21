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

// type Counselor = {
//     dateAccredited: string;
//     role: string | null;
//     id?: number;
// };

class CounselorTable extends Component<CounselorTableProps, {}> {
    deleteCounselor = (counselor: Counselor) => {
        fetch(`http://localhost:3000/counselor/${counselor.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.token}`,
            }),
        })
            // Refetch all workouts so only workouts which haven't been deleted are detected.
            .then(() => this.props.fetchCounselors())
}

    counselorMapper = (): JSX.Element[] => {
        return this.props.counselors.map((counselor: Counselor, index: number) => {
            return (
                <tr key={index}>
                <th scope='row'>{counselor.id}</th>
                <td>{counselor.dateAccredited}</td>
                <td>{counselor.role}</td>
                <td>
                    {/* using the functions passed as props from WorkoutIndex */}
                    <Button
                        color='warning'
                        onClick={() => {
                            this.props.editUpdateCounselor(counselor)
                            this.props.updateOn()
                        }}
                    >
                        Update
                    </Button>
                    {/* onClick takes a callback fn defined in our JSX.
                - It calls deleteWorkout with a 'workout' argument, which is defined
                -- through our .map in workoutMapper. */}
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
                <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
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