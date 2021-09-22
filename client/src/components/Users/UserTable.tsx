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

// type User = {
//     dateAccredited: string;
//     role: string | null;
//     id?: number;
// };

class UserTable extends Component<UserTableProps, {}> {
    deleteUser = (user: User) => {
        fetch(`http://localhost:3000/user/${user.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.token}`,
            }),
        })
            // Refetch all users so only users which haven't been deleted are detected.
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
                    {/* using the functions passed as props from UserIndex */}
                    <Button
                        color='warning'
                        onClick={() => {
                            this.props.editUpdateUser(user)
                            this.props.updateOn()
                        }}
                    >
                        Update
                    </Button>
                    {/* onClick takes a callback fn defined in our JSX.
                - It calls deleteUser with a 'user' argument, which is defined
                -- through our .map in userMapper. */}
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