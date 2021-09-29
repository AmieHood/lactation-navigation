import React from "react";
import { Component } from "react";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
} from "reactstrap";
import { Counselor } from '../../types'

type CounselorEditProps = {
    token: string;
    counselorToUpdate: Counselor;
    updateOff: () => void
    fetchCounselors: () => void
};

class CounselorEdit extends Component<CounselorEditProps, Counselor> {
    constructor(props: CounselorEditProps) {
        super(props);
        this.state = {
            dateAccredited: this.props.counselorToUpdate.dateAccredited,
            role: this.props.counselorToUpdate.role,
            token: this.props.token
        };
    }

    counselorUpdate = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        let updatedCounselorData = {
        dateAccredited: this.state.dateAccredited,
        role: this.state.role,
        };
        fetch(
        `http://localhost:3000/counselor/${this.props.counselorToUpdate.id}`,
        {
            method: "PUT",
            body: JSON.stringify(updatedCounselorData),
            headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.props.token}`,
            }),
        }
        )
        .then((res) => res.json())
        .then((data) => {
            this.props.fetchCounselors()
            this.props.updateOff()
        })
        .catch((err) => {
            console.error(err);
        });
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value } as unknown as Pick<
        Counselor,
        keyof Counselor
        >);
    };
    render() {
        return (
        <Modal isOpen={true}>
            <ModalHeader className='modal-header'>Update Counselor</ModalHeader>
            <ModalBody className='modal-body'>
            <Form onSubmit={this.counselorUpdate}>
                <FormGroup>
                <Label htmlFor="dateAccredited">Edit Date of Accreditation:</Label>
                <Input
                    type='date'
                    name="dateAccredited"
                    value={this.state.dateAccredited}
                    onChange={this.handleChange}
                />
                </FormGroup>
                <Button type="submit">Update Counselor</Button>
                <Button type="button" className="close modal-header">
                    <span aria-hidden="true">&times;</span>
                    </Button>
            </Form>
            </ModalBody>
        </Modal>
        );
    }
}

export default CounselorEdit;