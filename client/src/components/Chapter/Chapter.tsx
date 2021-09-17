import React from "react";
import { Component } from "react";
// import {SignupState} from '../Auth/Signup'
import { Form, Button, FormGroup, Label, Input, Container, Col, Row, Media } from 'reactstrap';
import logo from '../../assets/logo.png'

type ChapterProps = {
    updateToken: (newToken: string) => void
}

type ChapterState = {
    chapterName: string,
    chapterCity: string,
    chapterState: string,
    chapterPhone: string,
    chapterWebsite: string
}

class Chapter extends Component <ChapterProps, ChapterState> {
    constructor(props: ChapterProps) {
        super(props)
        this.state = {
            chapterName: '',
            chapterCity: '',
            chapterState: '',
            chapterPhone: '',
            chapterWebsite: ''
        }
        this.handleChange= this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value } as unknown as Pick<
            ChapterState,
            keyof ChapterState
            >)
            return (
                'Chapter Created!'
            )            
        }
    
    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        console.info('fetch?')
        event.preventDefault()
        let newChapterData = {
            chapterName: this.state.chapterName,
            chapterCity: this.state.chapterCity,
            chapterState: this.state.chapterState,
            chapterPhone: this.state.chapterPhone,
            chapterWebsite: this.state.chapterWebsite,
        }
        console.log(`newChapterData --> ${newChapterData.chapterName} ${newChapterData.chapterState}`);

        fetch(`http://localhost:3000/chapter/create`, {
                    method: 'POST',
                    body: JSON.stringify(newChapterData),
                    headers: new Headers ({
                        'Content-Type': 'application/json'
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    this.props.updateToken(data.sessionToken)
                    console.info(data)
                })
                .catch(err => {
                    console.error(err)
                    console.info(err)
                })

        
    }

    render(){
        return(
            <>
                <div>
                <Container>
                    <Row>
                        <Col><Media top width="100%" src={logo} alt="Card image cap"></Media><h1>Chapter</h1></Col>
                    </Row>
                    <Row>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor='chapterName'></Label>
                                <Input placeholder='Chapter Name' type='text' name='chapterName' onChange={this.handleChange} value={this.state.chapterName} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='chapterCity'></Label>
                                <Input placeholder='City' type='text' name='chapterCity' onChange={this.handleChange} value={this.state.chapterCity} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='chapterState'></Label>
                                <Input placeholder='State' type='text' name='chapterState' onChange={this.handleChange} value={this.state.chapterState} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='chapterPhone'></Label>
                                <Input placeholder='Phone' type='text' name='chapterPhone' onChange={this.handleChange} value={this.state.chapterPhone}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='chapterWebsite'></Label>
                                <Input placeholder='Website' type='text' name='chapterWebsite' onChange={this.handleChange} value={this.state.chapterWebsite} />
                            </FormGroup>
                            <Button type='submit'>Edit Chapter</Button>
                        </Form>
                    </Row>
                </Container>
                </div>
            </>
        )
    }
}

export default Chapter