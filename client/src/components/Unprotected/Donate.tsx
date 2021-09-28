import React, { Component } from 'react'
import { Card, CardImg, CardBody, CardTitle, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap'
import logo from '../../assets/heartmilk.jpg'

type DonateProps = {
}

type DonateState = {
}


class Donate extends Component<DonateProps, DonateState> {
    render() {
        return (
            <div>
            <Card className='card'>
                <CardImg className='all-cards' top width="50%" src={logo} alt="Card image cap" />
                <CardBody className='all-cards'>
                    <CardTitle className='card-img-overlay' tag="h1">Donate</CardTitle>
                </CardBody>
            </Card>

            <Form inline>
            <FormGroup>
            <Input type="text" name="" placeholder="First Name" />
            </FormGroup>
            <FormGroup>
            <Input type="text" name="" placeholder="Last Name" />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">Choose Amount</Label>
                <Input type="select" name="select" id="exampleSelect">
                <option>$5</option>
                <option>$10</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelectMulti">Select Multiple</Label>
                <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleText">Text Area</Label>
                <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input type="file" name="file" id="exampleFile" />
                <FormText color="muted">
                This is some placeholder block-level help text for the above input.
                It's a bit lighter and easily wraps to a new line.
                </FormText>
            </FormGroup>
            <FormGroup tag="fieldset">
                <legend>Radio Buttons</legend>
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    Option one is this and that—be sure to include why it's great
                </Label>
                </FormGroup>
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    Option two can be something else and selecting it will deselect option one
                </Label>
                </FormGroup>
                <FormGroup check disabled>
                <Label check>
                    <Input type="radio" name="radio1" disabled />{' '}
                    Option three is disabled
                </Label>
                </FormGroup>
            </FormGroup>
            <FormGroup check>
                <Label check>
                <Input type="checkbox" />{' '}
                Check me out
                </Label>
            </FormGroup>
            <Button>Submit</Button>
            </Form>
            </div>
        )
    }
}

export default Donate