import React from "react";
import { Component } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

type Props = {
    updateToken(newToken: string): void;
    };

    type PortalState = {
    showLogin: boolean;
    };

    class Portal extends Component<Props, PortalState> {
    constructor(props: Props) {
        super(props);
        this.state = {
        showLogin: true,
        };

        // this.toggle = this.toggle.bind(this);
    }

    //Login/Signup toggle
    toggle = () => {
        this.setState({ showLogin: !this.state.showLogin });
    };

    render() {
        return (
        <>
        <Container>
        <Row>
            {this.state.showLogin ? (
            <>
            <Col md="6" className="login-col">
            <Login updateToken={this.props.updateToken} />
            </Col>
            <Link to="/portal"><Button onClick={this.toggle}>Sign Up Here</Button></Link>
            </>
            ) : (
            <>
            <Col md="6" className="auth-container">
            <Signup updateToken={this.props.updateToken} />
            </Col>
            <p>Already have an account?</p> 
            <Link to="/portal"><Button onClick={this.toggle}>Log In here.</Button>
            </Link>
            </>
            )}
        </Row>
        </Container>
        </>
        );
    }
}

export default Portal;
