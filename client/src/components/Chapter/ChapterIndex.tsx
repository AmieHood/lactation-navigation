import React from "react";
import { Component } from "react";
import { Container, Col, Row, Media } from 'reactstrap';
import { Chapter } from '../../types'
import ChapterCreate from './ChapterCreate'
import ChapterEdit from './ChapterEdit'
import ChapterTable from './ChapterTable'
import APIURL from '../../utils/Environment'
import { Redirect } from "react-router";
import styled from 'styled-components'
import ChapterView from '../../assets/chapterview.jpg'

const Background = styled.div`
    background-image: url(${ChapterView});
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    margin: auto;
    justify-content: center;
    align-items: center;

    // @media screen and (max-width: 768px) {
    //     background-image: url(${ChapterView});
    // }


`

const Text = styled.div`
    margin: auto;
    margin-top: 30em;
    width: 50vw;
    padding: 1em;
    justify-content: center;
    align-items: center;
    text-align: center;
    
`

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
            
            <>
            {this.state.failed
            ?
            <Redirect to='/' />
            :
            <>
            {/* <Container>
            <Row>
            <Col md='9' xs='12'> */}
            <ChapterCreate
            fetchChapters={this.fetchChapters}
            token={this.props.token}
            />
            {/* </Col>
            </Row>
            </Container>

            <Container>
            <Row>
            <Col md='9' xs='12'> */}
            <ChapterTable
            chapters={this.state.chapters}
            editUpdateChapter={this.editUpdateChapter}
            updateOn={this.updateOn}
            fetchChapters={this.fetchChapters}
            token={this.props.token}
            />
            
            {/* </Col> */}
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
                    {/* </Row>
                    </Container> */}
                    </>
                }   
            </> 
            
        )
    }
}

export default ChapterIndex