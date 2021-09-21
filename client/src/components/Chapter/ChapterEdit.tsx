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
import { Chapter } from '../../types'

type ChapterEditProps = {
    token: string;
    chapterToUpdate: Chapter;
    updateOff: () => void
    fetchChapters: () => void
};

// type Chapter = {
//     dateAccredited: string;
//     role: string | null;
//     id?: number;
// };

class ChapterEdit extends Component<ChapterEditProps, Chapter> {
    constructor(props: ChapterEditProps) {
        super(props);
        this.state = {
            chapterName: this.props.chapterToUpdate.chapterName,
            chapterCity: this.props.chapterToUpdate.chapterCity,
            chapterState: this.props.chapterToUpdate.chapterState,
            chapterPhone: this.props.chapterToUpdate.chapterPhone,
            chapterWebsite: this.props.chapterToUpdate.chapterWebsite
        };
    }

    chapterUpdate = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        let updatedChapterData = {
            chapterName: this.state.chapterName,
            chapterCity: this.state.chapterCity,
            chapterState: this.state.chapterState,
            chapterPhone: this.state.chapterPhone,
            chapterWebsite: this.state.chapterWebsite
        };
        fetch(
        `http://localhost:3000/chapter/${this.props.chapterToUpdate.id}`,
        {
            method: "PUT",
            body: JSON.stringify(updatedChapterData),
            headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.props.token}`,
            }),
        }
        )
        .then((res) => res.json())
        .then((data) => {
            console.info(data);
            this.props.fetchChapters()
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
        Chapter,
        keyof Chapter
        >);
    };
    render() {
        return (
        <Modal isOpen={true}>
            <ModalHeader>Update Chapter</ModalHeader>
            <ModalBody>
            <Form onSubmit={this.chapterUpdate}>
                <FormGroup>
                <Label htmlFor="chapterName">Edit Chapter Name:</Label>
                <Input
                    name="chapterName"
                    value={this.state.chapterName}
                    onChange={this.handleChange}
                />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="chapterName">Edit Chapter Name:</Label>
                <Input
                    name="chapterName"
                    value={this.state.chapterName}
                    onChange={this.handleChange}
                />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="chapterName">Edit Chapter Name:</Label>
                <Input
                    name="chapterName"
                    value={this.state.chapterName}
                    onChange={this.handleChange}
                />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="chapterName">Edit Chapter Name:</Label>
                <Input
                    name="chapterName"
                    value={this.state.chapterName}
                    onChange={this.handleChange}
                />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="chapterName">Edit Chapter Name:</Label>
                <Input
                    name="chapterName"
                    value={this.state.chapterName}
                    onChange={this.handleChange}
                />
                </FormGroup>
                <Button type="submit">Update Chapter!</Button>
            </Form>
            </ModalBody>
        </Modal>
        );
    }
}

export default ChapterEdit;