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

// type CounselorTableState = {
//     failed: boolean
// };

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
                <th scope='row'>{counselor.id}</th>
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

//     async componentDidMount(){
//         console.info('working?')
//         console.info(`${APIURL}/counselor`)
//         try {
//                 let res = await fetch(`${APIURL}/counselor/validate`, {
//                     headers: new Headers ({
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${this.props.token}`
//                     })
//                 })
//                     let json = await res.json()
//                     let Counselor = json
//                     console.info(Counselor)
//                     console.info(json)
//                 if (Counselor == null){
//                     this.setState({failed: true})
//                     return
//                 } else {
//                     this.setState({ failed: false})
//                     this.counselorMapper()
//     }
// } catch (error) {
//     console.error(error)
//     this.setState({ failed: true})
// }
// }


    render() {

        return (
            // {
            //  this.state.failed
            // ? <> </> 
            // :   
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
            // }
            )
    }
    }

    export default CounselorTable