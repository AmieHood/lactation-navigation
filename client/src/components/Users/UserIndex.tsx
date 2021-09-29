import React from "react";
import { Component } from "react";
import { Container, Col, Row, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import APIURL from "../../utils/Environment";
import { User } from '../../types'
import UserEdit from './UserEdit'
import UserTable from './UserTable'
import { Redirect } from 'react-router-dom'
import logo from '../../assets/info.jpg'

type UserIndexProps = {
    token: string
    user: User
}

type UserIndexState = {
    users: User[]
    updateActive: boolean
    userToUpdate: User
    failed: boolean
    role: string | null
}

class UserIndex extends Component <UserIndexProps, UserIndexState> {
    constructor(props: UserIndexProps) {
        super(props)
        this.state = {
            users: [],
            updateActive: false,
            userToUpdate: {
                firstName: '',
                lastName: '', 
                email: '', 
                password: '',
                confirmPassword: '',
                emailValid: false, 
                message: '',
                id: 0,
                Counselor: {
                    dateAccredited: '',
                    role: '',
                    token: '',
                    id: 0,
                  },
            },
            failed: false,
            role: ''
        }
    }

    fetchUsers = (): void => {
        fetch(`http://localhost:3000/user/all`, {
                    method: 'GET',
                    headers: new Headers ({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.props.token}`
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    this.setState({ users: data})
                })
                .catch(err => {
                    console.error(err)
                })
    }


    editUpdateUser = (user: User): void => {
        this.setState({ userToUpdate: user})
    }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }
    
    async componentDidMount(){
        try {
                let res = await fetch(`${APIURL}/counselor/validate`, {
                    headers: new Headers ({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.props.token}`
                    })
                })
                    let json = await res.json()
                    let Counselor = json
                    console.info(json)
                if (Counselor == null){
                    this.setState({failed: true})
                    return
                } else {
                    this.setState({ failed: false})
                    this.fetchUsers()
                }
} catch (error) {
    console.error(error)
    this.setState({ failed: true})
}
}
    
    render(){
        return(
            <div>
                <Card className='card'>
                    <CardImg className='all-cards' top width="100%" src={logo} alt="Card image cap" />
                    <p>Photo by Thea on Unsplash</p>
                    <CardBody className='all-cards'>
                        <CardTitle className='card-img-overlay' tag="h1">User Profiles</CardTitle>
                    </CardBody>
                </Card>
            {this.props?.user?.Counselor?.role !== 'Counselor'
            ? <Redirect to="/" />
            :
            <Container>
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
                    {this.state.updateActive  ? (
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
            }
            </div> 
            
        )
    }
}

export default UserIndex