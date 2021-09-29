import React from "react";
import { Component } from "react";
import { Chapter } from '../../types'
import ChapterCreate from './ChapterCreate'
import ChapterEdit from './ChapterEdit'
import ChapterTable from './ChapterTable'
import { User } from '../../types'


type ChapterIndexProps = {
    token: string
    user: User
}

type ChapterIndexState = {
    chapters: Chapter[]
    updateActive: boolean
    chapterToUpdate: Chapter | null
    failed: boolean
    role: string | null
}

class ChapterIndex extends Component <ChapterIndexProps, ChapterIndexState> {
    constructor(props: ChapterIndexProps) {
        super(props)
        this.state = {
            chapters: [],
            updateActive: false,
            chapterToUpdate: null,
            failed: false,
            role: ''
        }
    }

    fetchChapters = (): void => {
        fetch(`http://localhost:3000/chapter/all`, {
                    method: 'GET',
                    headers: new Headers ({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.props.token}`
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    this.setState({ chapters: data})
                })
                .catch(err => {
                    console.error(err)
                })
    }

    editUpdateChapter = (chapter: Chapter): void => {
        this.setState({ chapterToUpdate: chapter})
    }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    componentDidMount = (): void => {
        this.fetchChapters()
    }

    render(){
        return(
            
            <>
            
            {this.props.token && this.props?.user?.Counselor?.role == 'Counselor'
            ?
            <>
            <ChapterCreate
            fetchChapters={this.fetchChapters}
            token={this.props.token}
            />
            <ChapterTable
            chapters={this.state.chapters}
            editUpdateChapter={this.editUpdateChapter}
            updateOn={this.updateOn}
            fetchChapters={this.fetchChapters}
            token={this.props.token}
            />
            
            {this.state.updateActive && this.state.chapterToUpdate ? (
                <ChapterEdit
                chapterToUpdate={this.state.chapterToUpdate}
                updateOff={this.updateOff}
                token={this.props.token}
                fetchChapters={this.fetchChapters}
                />
                ) : (
                    <></>
                    )}
            </>
            :
            <></>
                }   
            </> 
            
        )
    }
}

export default ChapterIndex