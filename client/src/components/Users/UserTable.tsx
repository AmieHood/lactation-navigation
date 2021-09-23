import React, { Component } from 'react'
import { Button, Table } from 'reactstrap'
import { User } from '../../types'

type UserTableProps = {
    token: string
    users: User[]
    editUpdateUser: (user: User) => void
    updateOn: () => void
    fetchUsers: () => void
}

class UserTable extends Component<UserTableProps, {}> {
    deleteUser = (user: User) => {
        fetch(`http://localhost:3000/user/${user.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.token}`,
            }),
        })
            .then(() => this.props.fetchUsers())
}

    userMapper = (): JSX.Element[] => {
        return this.props.users.map((user: User, index: number) => {
            return (
                <tr key={index}>
                <th scope='row'>{user.id}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                    <Button
                        color='warning'
                        onClick={() => {
                            this.props.editUpdateUser(user)
                            this.props.updateOn()
                        }}
                    >
                        Update
                    </Button>
                    <Button
                        color='danger'
                        onClick={() => {
                            this.deleteUser(user)
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
                <h3>User List</h3>
                <hr />
                <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>{this.userMapper()}</tbody>
                </Table>
            </>
        )
    }
    }

    export default UserTable