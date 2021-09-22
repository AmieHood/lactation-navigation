import React from "react";
import { Component } from "react";
import { Form, Button, FormGroup, Label, Input, Container, Col, Row, Media } from 'reactstrap';
import logo from '../../assets/logo.png'
import { Chapter } from '../../types'
import ChapterCreate from './ChapterCreate'
import ChapterEdit from './ChapterEdit'
import ChapterTable from './ChapterTable'

type ChapterIndexProps = {
    token: string
}

type ChapterIndexState = {
    chapters: Chapter[]
    updateActive: boolean
    chapterToUpdate: Chapter | null
}

class ChapterIndex extends Component <ChapterIndexProps, ChapterIndexState> {
    constructor(props: ChapterIndexProps) {
        super(props)
        this.state = {
            chapters: [],
            updateActive: false,
            chapterToUpdate: null
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

    // handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const target = event.target
    //     const value = target.value
    //     const name = target.name
    //     this.setState({
    //         [name]: value } as unknown as Pick<
    //         ChapterState,
    //         keyof ChapterState
    //         >)
    //         return (
    //             'Congratulations! You are a Breastfeeding Chapter!'
    //         )
            
    // }


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

    componentDidMount = (): void => {
        this.fetchChapters()
    }

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
    
    render(){
        return(
               // this.state.failed 
            // ? <Redirect to="/" /> 
            //     :   !this.state.role 
            //     ?  <h2> Loading profile details</h2>      
            //     : 
            <div>
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
            </div> 
            
        )
    }
}

export default ChapterIndex