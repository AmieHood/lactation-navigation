import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import { User } from "../../types";
import APIURL from "../../utils/Environment";
import { Counselor2 } from '../../types'

type UserTableProps = {
    token: string;
    users: User[];
    editUpdateUser: (user: User) => void;
    updateOn: () => void;
    fetchUsers: () => void;
    };

    type UserTableState = {
    isCounselor: boolean;
    userArray: number[]
    };

    class UserTable extends Component<UserTableProps, UserTableState> {
    constructor(props: UserTableProps) {
        super(props);
        this.state = {
        isCounselor: false,
        userArray: []
        };
    }
    deleteUser = (user: User) => {
        fetch(`http://localhost:3000/user/${user.id}`, {
        method: "DELETE",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.props.token}`,
        }),
        }).then(() => this.props.fetchUsers());
    };

    fetchCounselor = async (): Promise<void> => {
        try {
            let res = await fetch(`${APIURL}/counselor/all`, {
                headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.props.token}`,
                }),
            })
            let counselorArray = await res.json()
            counselorArray.forEach((counselor: Counselor2) => {
                this.state.userArray.push(counselor.UserId)
            });
        } catch (error) {
        console.error(error);
        this.setState({ isCounselor: false });
        }
    };

    counselorReturn = () => {
        if (this.state.isCounselor) {
            <>Counselor</>;
        } else {
            <>broken</>;
        }
    };

    userMapper = (): JSX.Element[] => {
        return this.props.users.map((user: User, index: number) => {
        return (
            <tr key={index}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{ user.id === undefined ?
                user.id = 999999
                : 
            this.state.userArray.includes(user.id) ? <>Counselor</> : <>Member</>}
            </td>
            <td>
                <Button
                outline color="success"
                onClick={() => {
                    this.props.editUpdateUser(user);
                    this.props.updateOn();
                }}
                >
                Update
                </Button>
                <Button
                outline color="danger"
                onClick={() => {
                    this.deleteUser(user);
                }}
                >
                Delete
                </Button>
            </td>
            </tr>
        );
        });
    };

    componentDidMount() {
        this.fetchCounselor();
    }

    render() {
        return (
        <>
            <h3>User List</h3>
            <hr />
            <Table responsive hover>
            <thead>
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                </tr>
            </thead>
            <tbody>{this.userMapper()}</tbody>
            </Table>
        </>
        );
    }
}

export default UserTable;
