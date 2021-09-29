import React from "react";
import { Component } from "react";
import { Counselor } from "../../types";
import CounselorCreate from "./CounselorCreate";
import { User } from "../../types";
import { Redirect } from "react-router";
import { Alert } from 'reactstrap'

type CounselorIndexProps = {
    token: string;
    user: User;
};

type CounselorIndexState = {
    counselors: Counselor[];
    updateActive: boolean;
    counselorToUpdate: Counselor | null;
    failed: boolean;
    role: string | null;
};

class CounselorIndex extends Component<CounselorIndexProps, CounselorIndexState> {
    constructor(props: CounselorIndexProps) {
        super(props);
        this.state = {
        counselors: [],
        updateActive: false,
        counselorToUpdate: null,
        failed: false,
        role: "",
        };
    }

    fetchCounselors = (): void => {
        fetch(`http://localhost:3000/counselor/all`, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.props.token}`,
        }),
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState({ counselors: data });
        })
        .catch((err) => {
            console.error(err);
        });
    };

    editUpdateCounselor = (counselor: Counselor): void => {
        this.setState({ counselorToUpdate: counselor });
    };

    updateOn = (): void => {
        this.setState({ updateActive: true });
    };

    updateOff = (): void => {
        this.setState({ updateActive: false });
    };

    componentDidMount() {
        this.fetchCounselors();
    }

    render() {
        //! counselor role not working
        return (
        <div>
            {this.props.token ? (
            <>
                <CounselorCreate
                fetchCounselors={this.fetchCounselors}
                token={this.props.token}
                />
            </>
            ) : (
            <></>
            )}
           
        </div>
        );
    }
}

export default CounselorIndex;
