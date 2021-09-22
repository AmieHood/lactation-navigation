import React from "react";
import { Component } from "react";
import { Form, Button, FormGroup, Label, Input, Container, Col, Row, Media } from 'reactstrap';
import logo from '../../assets/logo.png'
import { User } from '../../types'
// import UserCreate from './UserCreate'
import UserEdit from './UserEdit'
import UserTable from './UserTable'

type UserIndexProps = {
    token: string
}

type UserIndexState = {
    users: User[]
    updateActive: boolean
    userToUpdate: User | null
}

class UserIndex extends Component <UserIndexProps, UserIndexState> {
    constructor(props: UserIndexProps) {
        super(props)
        this.state = {
            users: [],
            updateActive: false,
            userToUpdate: null
        }
    }

    fetchUsers = (): void => {
        fetch(`http://localhost:3000/user/all`, {
                    method: 'GET',
                    // body: JSON.stringify(newUserData),
                    headers: new Headers ({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.props.token}`
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    this.setState({ users: data})
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
    //         UserState,
    //         keyof UserState
    //         >)
    //         return (
    //             'Congratulations! You are a Breastfeeding User!'
    //         )
            
    // }


    editUpdateUser = (user: User): void => {
        this.setState({ userToUpdate: user})
        console.log(user);
    }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    componentDidMount = (): void => {
        this.fetchUsers()
    }

    // async componentDidMount(){
//     console.info('working?')
//     console.info(`${APIURL}/counselor`)
//     try {
//         let res = await fetch(`${APIURL}/counselor/all`)
//         let json = await res.json()
//         let { user } = json
//         console.info(json)
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
               // this.state.failed 
            // ? <Redirect to="/" /> 
            //     :   !this.state.role 
            //     ?  <h2> Loading profile details</h2>      
            //     : 
            <div>
            <Container>
                <Row>
                    {/* <Col md='3'>
                        <UserCreate
                            fetchUsers={this.fetchUsers}
                            token={this.props.token}
                        />
                    </Col> */}
                </Row>
                <Row>
                    <Col md='9'>
                        <UserTable
                            users={this.state.users}
                            editUpdateUser={this.editUpdateUser}
                            updateOn={this.updateOn}
                            fetchUsers={this.fetchUsers}
                            token={this.props.token}
                        />

                    </Col>
                    {/* won't show up until workout is set (originally set to null)
                    - null doesn't guarantee workout has been set */}
                    {this.state.updateActive && this.state.userToUpdate ? (
                        <UserEdit
                            userToUpdate={this.state.userToUpdate}
                            updateOff={this.updateOff}
                            token={this.props.token}
                            fetchUsers={this.fetchUsers}
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

export default UserIndex