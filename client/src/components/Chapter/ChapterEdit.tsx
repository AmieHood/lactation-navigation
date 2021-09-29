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
    chapterToUpdate: Chapter
    updateOff: () => void
    fetchChapters: () => void
};

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

    handleCancel = () => {
        this.props.updateOff()
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
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
            this.props.fetchChapters()
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
        Chapter,
        keyof Chapter
        >);
    };
    render() {
        return (
        <Modal isOpen={true}>
            <ModalHeader>Update Chapter</ModalHeader>
            <ModalBody>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                <Label htmlFor="chapterName">Chapter Name:</Label>
                <Input
                    name="chapterName"
                    value={this.state.chapterName}
                    onChange={this.handleChange}
                />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="chapterCity">City:</Label>
                <Input
                    name="chapterCity"
                    value={this.state.chapterCity}
                    onChange={this.handleChange}
                />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="chapterState">State:</Label>
                <Input
                    name="chapterState"
                    value={this.state.chapterState}
                    onChange={this.handleChange}
                />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="chapterPhone">Phone:</Label>
                <Input
                    name="chapterPhone"
                    value={this.state.chapterPhone}
                    onChange={this.handleChange}
                />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="chapterWebsite">Website:</Label>
                <Input
                    name="chapterWebsite"
                    value={this.state.chapterWebsite}
                    onChange={this.handleChange}
                />
                </FormGroup>
                <Button type="submit">Update Chapter!</Button>
                <Button onClick={this.handleCancel}>Cancel</Button>
            </Form>
            </ModalBody>
        </Modal>
        );
    }
}

export default ChapterEdit;