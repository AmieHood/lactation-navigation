import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button,
    NavLink,
} from "reactstrap";

const logoStyle = {
    width: "64px",
};

type SitebarProps = {
    clickLogout: () => void;
    token: string;
};

type SitebarState = {
    isOpen: boolean;
    click: boolean;
};

class Sitebar extends Component<SitebarProps, SitebarState> {
    constructor(props: SitebarProps) {
        super(props);
        this.state = {
        isOpen: false,
        click: false,
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handleClick = () => {
        this.setState({ click: !this.state.click });
    };

    render() {
        return (
        <>
            <Navbar className="sitebar" expand="md">
            <img style={logoStyle} src={logo} />
            <NavbarBrand href="/" className="mr-auto sitebar">
                Lactation Navigation
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="mr-2">
                <div id="close-icon" className={this.state.isOpen ? "open" : ""}>
                <span></span>
                <span></span>
                <span></span>
                </div>
            </NavbarToggler>
            <Collapse isOpen={!this.state.isOpen} navbar>
                <Nav className="mr-auto sitebar" navbar>
                <NavItem>
                    <NavLink onClick={this.toggle}>
                    <Link to="/" className="navbar-logo sitebar">
                        Home
                    </Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/portal" onClick={this.toggle}>
                    <Link to="/portal">Log In</Link>
                    </NavLink>
                </NavItem>
                {this.props.token ? (
                    <>
                    <NavItem>
                        <NavLink to="/portal" onClick={this.toggle}>
                        <Link to="/user">Profile</Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/portal" onClick={this.toggle}>
                        <Link to="/chapter">Chapter</Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/counselor" onClick={this.toggle}>
                        <Link to="/counselor">Counselor</Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/" onClick={this.props.clickLogout}>
                        <Link to="/">Log Out</Link>
                        </NavLink>
                    </NavItem>
                    </>
                ) : (
                    <></>
                )}
                </Nav>
            </Collapse>
            </Navbar>
        </>
        );
    }
}
export default Sitebar;
