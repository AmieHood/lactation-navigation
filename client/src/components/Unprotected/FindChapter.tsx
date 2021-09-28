import React, { Component } from 'react'
import { Input, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardImg, CardBody, CardTitle } from 'reactstrap'
import { Chapter } from '../../types'
import { States } from '../../types'
import logo from '../../assets/findchapter.jpg'

type FindChapterProps = {
    // chapters: Chapter[]
    // statesArray: States
}

type FindChapterState = {
    chapters: Chapter[]
    dropdownOpen: boolean
    states: States | null
    allChapters: Chapter[]
}



class FindChapter extends Component<FindChapterProps, FindChapterState> {
    constructor(props: FindChapterProps) {
        super(props)
        this.state ={
            chapters: [], 
            dropdownOpen: false,
            states: null  ,
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
                console.info(data);
            })
            .catch((err) => {
                console.error(err);
                console.info(err);
            });
        };
        
    filterChapters = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.info('filter chapters')
        const target = e.target
        const value = target.value.toLowerCase()

        const chapterSearch = this.state.allChapters.filter
        (chapter => (`${chapter.chapterState}`.toLowerCase().includes(value)))
        this.setState({ chapters: chapterSearch})
        console.info(chapterSearch)
    }
    
    chapterMapper = (): JSX.Element[] => {
        return this.state.chapters.map((chapter: Chapter, index: number) => {
        return (
            <tr key={index}>
            {/* <th scope='row'>{chapter.id}</th> */}
            <td>{chapter.chapterName}</td>
            <td>{chapter.chapterCity}</td>
            <td>{chapter.chapterState}</td>
            <td>{chapter.chapterPhone}</td>
            {/* <td>{chapter.chapterWebsite}</td> */}
            </tr>
        )
        })
    }


    //     statesListMapper = (): JSX.Element[] => {
    //         return this.props.statesArray.map((usState: string, index: number) => {
    //         return (
    //             <DropdownItem>{usState}</DropdownItem>
    //         )
    //     })
    // }
    
    componentDidMount = (): void => {
        this.fetchChapters()
    }
    
    render() {
        return (
            <>
            <Card className='card'>
                <CardImg className='all-cards' top width="100%" src={logo} alt="Card image cap" />
                <CardBody className='all-cards'>
                    <CardTitle className='card-img-overlay' tag="h1">Find a Chapter Near You</CardTitle>
                </CardBody>
            </Card>
            {/* <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>Pick a State</DropdownToggle>
                <DropdownMenu>
                    {this.statesListMapper()}
                </DropdownMenu>
            </Dropdown> */}
            <h3>Chapter List</h3>
            <hr />
            <div>
                <Input placeholder="Search by State Abbreviation" onChange={this.filterChapters} />


                {/* <ResourceCards
                    resources={this.state.resources}
                    editResource={this.editResource}
                    token={this.props.token}
                    updateOn={this.updateOn}
                    fetchResources={this.fetchResources}
                /> */}
            </div>
            <Table responsive>
            <thead>
                <tr>
                    {/* <th>#</th> */}
                    <th>Chapter Name</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Phone</th>
                    {/* <th>Website</th> */}
                </tr>
            </thead>
            <tbody>{this.chapterMapper()}</tbody>
            </Table>
            </>
        )
    }
}

export default FindChapter