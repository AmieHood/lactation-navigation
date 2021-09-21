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

// type Counselor = {
//     dateAccredited: string;
//     role: string | null;
//     id?: number;
// };

class CounselorEdit extends Component<CounselorEditProps, Counselor> {
    constructor(props: CounselorEditProps) {
        super(props);
        this.state = {
            dateAccredited: this.props.counselorToUpdate.dateAccredited,
            role: this.props.counselorToUpdate.role,
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
            console.info(data);
            this.props.fetchCounselors()
            this.props.updateOff()
        })
        .catch((err) => {
            console.error(err);
            console.info(err);
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
            <ModalHeader>Update Counselor</ModalHeader>
            <ModalBody>
            <Form onSubmit={this.counselorUpdate}>
                <FormGroup>
                <Label htmlFor="dateAccredited">Edit Date of Accreditation:</Label>
                <Input
                    name="dateAccredited"
                    value={this.state.dateAccredited}
                    onChange={this.handleChange}
                />
                </FormGroup>
                <Button type="submit">Update Counselor!</Button>
            </Form>
            </ModalBody>
        </Modal>
        );
    }
}

export default CounselorEdit;

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
