import React, { Component } from 'react'
import { Input, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Chapter } from '../../types'
import { States } from '../../types'

type FindChapterProps = {
    // chapters: Chapter[]
    //statesArray: []
}

type FindChapterState = {
    chapters: Chapter[]
    dropdownOpen: boolean
    states: States | null
}


// type Chapter = {
//     dateAccredited: string;
//     role: string | null;
//     id?: number;
// };

class FindChapter extends Component<FindChapterProps, FindChapterState> {
    constructor(props: FindChapterProps) {
        super(props)
        this.state ={
            chapters: [], 
            dropdownOpen: false,
            states: null    
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
                this.setState({ chapters: data })
                console.info(data);
            })
            .catch((err) => {
                console.error(err);
                console.info(err);
            });
        };
        
        chapterMapper = (): JSX.Element[] => {
            return this.state.chapters.map((chapter: Chapter, index: number) => {
            return (
                <tr key={index}>
                <th scope='row'>{chapter.id}</th>
                <td>{chapter.chapterName}</td>
                <td>{chapter.chapterCity}</td>
                <td>{chapter.chapterState}</td>
                <td>{chapter.chapterPhone}</td>
                <td>{chapter.chapterWebsite}</td>
                </tr>
            )
        })
    }
    //     statesListMapper = (): JSX.Element[] => {
    //         return this.state.statesArray.map((usState: string, index: number) => {
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
                <h3>Find a Chapter Near You</h3>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>Pick a State</DropdownToggle>
                    <DropdownMenu>
                        {/* {this.statesListMapper()} */}
                    </DropdownMenu>
                </Dropdown>
                <h3>Chapter List</h3>
                <hr />
                <Table striped>
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

export default FindChapter