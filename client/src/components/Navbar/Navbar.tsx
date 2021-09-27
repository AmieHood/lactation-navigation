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
            <Navbar className="navbar fixed-top navbar-expand-lg navbar-dark p-md-3 " expand="lg">
            <img style={logoStyle} src={logo} alt=''/>
            <NavbarToggler onClick={this.toggle} className="mr-2">
                <div id="close-icon" className={!this.state.isOpen ? "" : "open"}>
                <span className='navbar-toggler-icon'></span>
                {/* <span></span>
                <span></span> */}
                </div>
            </NavbarToggler>
            <Collapse isOpen={!this.state.isOpen} navbar>
                <Nav className="mr-auto sitebar" navbar>
                <NavItem>
                    <NavLink to="/" onClick={this.toggle}>
                    <Link to="/" className='nav-link text-white nav-item' >Home</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/portal" onClick={this.toggle}>
                    <Link to="/portal" className='nav-link text-white nav-item'>Log In</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/findchapter" onClick={this.toggle}>
                    <Link to="/findchapter" className='nav-link text-white nav-item'>Find Support</Link>
                    </NavLink>
                </NavItem>
                {this.props.token ? (
                    <>
                    <NavItem>
                        <NavLink to="/user" onClick={this.toggle}>
                        <Link to="/user" className='nav-link text-white nav-item' >Profile</Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/chapter" onClick={this.toggle}>
                        <Link to="/chapter" className='nav-link text-white nav-item'>Chapter</Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/counselor" onClick={this.toggle}>
                        <Link to="/counselor" className='nav-link text-white nav-item' >Counselor</Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/" onClick={this.props.clickLogout}>
                        <Link to="/" className='nav-link text-white nav-item' onClick={this.toggle}>Log Out</Link>
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
