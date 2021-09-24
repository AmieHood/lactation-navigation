import React from "react";
import { Component } from "react";
import { Form, Button, FormGroup, Label, Input, Container, Col, Row, Media } from 'reactstrap';
import logo from '../../assets/logo.png'
import { Chapter } from '../../types'
import ChapterCreate from './ChapterCreate'
import ChapterEdit from './ChapterEdit'
import ChapterTable from './ChapterTable'
import APIURL from '../../utils/Environment'
import { Redirect } from "react-router";

type ChapterIndexProps = {
    token: string
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
                    // body: JSON.stringify(newChapterData),
                    headers: new Headers ({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.props.token}`
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    this.setState({ chapters: data})
                    console.info(data)
                })
                .catch(err => {
                    console.error(err)
                    console.info(err)
                })
    }

    editUpdateChapter = (chapter: Chapter): void => {
        this.setState({ chapterToUpdate: chapter})
        console.log(chapter);
    }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    // componentDidMount = (): void => {
    //     this.fetchChapters()
    // }

    async componentDidMount(){
        console.info('working?')
        console.info(`${APIURL}/counselor`)
        try {
                let res = await fetch(`${APIURL}/counselor/validate`, {
                    headers: new Headers ({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.props.token}`
                    })
                })
                    let json = await res.json()
                    let Counselor = json
                    console.info(Counselor)
                    console.info(json)
                if (Counselor == null){
                    this.setState({failed: true})
                    return
                } else {
                    this.setState({ failed: false})
                    this.fetchChapters()
                }
} catch (error) {
    console.error(error)
    this.setState({ failed: true})
}
}

    
    render(){
        return(
            <div>
            {this.state.failed
            ?
            <Redirect to='/' />
            :
            <Container>
            <Row>
            <Col md='9'>
            <ChapterCreate
            fetchChapters={this.fetchChapters}
            token={this.props.token}
            />
            </Col>
            </Row>
            <Row>
            <Col md='9'>
            <ChapterTable
            chapters={this.state.chapters}
            editUpdateChapter={this.editUpdateChapter}
            updateOn={this.updateOn}
            fetchChapters={this.fetchChapters}
            token={this.props.token}
            />
            
            </Col>
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
                    </Row>
                    </Container>
                }
                    </div> 
                    
        )
    }
}

export default ChapterIndex