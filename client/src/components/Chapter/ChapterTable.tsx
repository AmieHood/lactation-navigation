import React, { Component } from 'react'
import { Button, Table } from 'reactstrap'
import { Chapter } from '../../types'

type ChapterTableProps = {
    token: string
    chapters: Chapter[]
    editUpdateChapter: (chapter: Chapter) => void
    updateOn: () => void
    fetchChapters: () => void
}

// type Chapter = {
//     dateAccredited: string;
//     role: string | null;
//     id?: number;
// };

class ChapterTable extends Component<ChapterTableProps, {}> {
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

    chapterMapper = (): JSX.Element[] => {
        return this.props.chapters.map((chapter: Chapter, index: number) => {
            return (
                <tr key={index}>
                <th scope='row'>{chapter.id}</th>
                <td>{chapter.chapterName}</td>
                <td>{chapter.chapterCity}</td>
                <td>{chapter.chapterState}</td>
                <td>{chapter.chapterPhone}</td>
                <td>{chapter.chapterWebsite}</td>
                <td>
                    <Button
                        color='warning'
                        onClick={() => {
                            this.props.editUpdateChapter(chapter)
                            this.props.updateOn()
                        }}
                    >
                        Update
                    </Button>
                    <Button
                        color='danger'
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
                <Table className='table-responsive' responsive hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Chapter Name</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Phone</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>{this.chapterMapper()}</tbody>
                </Table>
            </>
        )
    }
    }

    export default ChapterTable