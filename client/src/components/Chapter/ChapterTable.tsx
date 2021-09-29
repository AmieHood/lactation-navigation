import React, { Component } from 'react'
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Chapter } from '../../types'

type ChapterTableProps = {
    token: string
    chapters: Chapter[]
    editUpdateChapter: (chapter: Chapter) => void
    updateOn: () => void
    fetchChapters: () => void
}

type ChapterTableState = {
    modal: boolean
}

class ChapterTable extends Component<ChapterTableProps, ChapterTableState> {
    constructor(props: ChapterTableProps){
        super(props)
        this.state = {
            modal: false
        }
    }
    
    deleteChapter = (chapter: Chapter) => {
        fetch(`http://localhost:3000/chapter/${chapter.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.token}`,
            }),
        })
            .then(() => this.props.fetchChapters())
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }


    chapterMapper = (): JSX.Element[] => {
        return this.props.chapters.map((chapter: Chapter, index: number) => {
            return (
                <tr key={index}>
                <td>{chapter.chapterName}</td>
                <td>{chapter.chapterState}</td>
                <td>
                    <Button
                        outline color="success"
                        onClick={() => {
                            this.props.editUpdateChapter(chapter)
                            this.props.updateOn()
                        }}
                    >
                        Update
                    </Button>
                    <Button
                        outline color="danger"
                        onClick={() => {
                            this.deleteChapter(chapter)
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
                <h3>Chapter List</h3>
                <hr />
                <Table responsive hover>
                <thead>
                    <tr>
                        <th>Chapter Name</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>{this.chapterMapper()}</tbody>
                </Table>
            </>
        )
    }
    }

    export default ChapterTable