import React, { Component } from 'react'
import { Input, Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap'
import { Chapter } from '../../types'
import logo from '../../assets/findchapter.jpg'
import bfusalogo from '../../assets/logo.png'

type FindChapterProps = {
}

type FindChapterState = {
    chapters: Chapter[]
    dropdownOpen: boolean
    allChapters: Chapter[]
}

class FindChapter extends Component<FindChapterProps, FindChapterState> {
    constructor(props: FindChapterProps) {
        super(props)
        this.state ={
            chapters: [], 
            dropdownOpen: false,
            allChapters: []
        }
    }

    toggle = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen  })
    }

    fetchChapters = (): void => {
        fetch(
            `http://localhost:3000/chapter/all`, {
                method: "GET",
                headers: new Headers({
                "Content-Type": "application/json",
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ chapters: data, allChapters: data })
            })
            .catch((err) => {
                console.error(err);
            });
        };
        
    filterChapters = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        const value = target.value.toLowerCase()

        const chapterSearch = this.state.allChapters.filter
        (chapter => (`${chapter.chapterState}`.toLowerCase().includes(value)))
        this.setState({ chapters: chapterSearch})
    }
    
    chapterMapper = (): JSX.Element[] => {
        return this.state.chapters.map((chapter: Chapter, index: number) => {
        return (
            <Card size='xs' className='chapter-cards' key={index}>
            <a href={chapter.chapterWebsite} target='_blank'>
                <CardImg top width="25%" src={bfusalogo} />
                <CardBody>
                    <CardTitle tag='h2'>{chapter.chapterName}</CardTitle>
                    <CardText>{chapter.chapterCity}</CardText>
                    <CardText>{chapter.chapterState}</CardText>
                    <CardText>{chapter.chapterPhone}</CardText>
                    <CardText>{chapter.chapterWebsite}</CardText>
                </CardBody>
                </a>
            </Card>
        )
        })
    }
    
    componentDidMount = (): void => {
        this.fetchChapters()
    }
    
    render() {
        return (
            <div>
            <Card>
                <CardImg className='all-cards' top width="100%" src={logo} alt="People Hugging." />
                <p>Image by Vonecia Carswell on Unsplash.</p>
                <CardBody className='all-cards'>
                    <CardTitle className='card-img-overlay' tag="h1">Find a Chapter Near You</CardTitle>
                </CardBody>
            </Card>
            <h3>Chapter List</h3>
            <hr />
            <div>
                <Input placeholder="Search by State Abbreviation" onChange={this.filterChapters} />
            </div>
            <div className='cardsContainer'>
                {this.chapterMapper()}
            </div>
            </div>
        )
    }
}

export default FindChapter