import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/reverselogo.png";
import APIURL from "../../utils/Environment";

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
    height: "5em",
};

type SitebarProps = {
    clickLogout: () => void;
    token: string;
    isCounselor: boolean
};

type SitebarState = {
    isOpen: boolean;
    click: boolean;
    failed: boolean,
    role: string | null
};

class Sitebar extends Component<SitebarProps, SitebarState> {
    constructor(props: SitebarProps) {
        super(props);
        this.state = {
        isOpen: false,
        click: false,
        failed: false,
        role: ''
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handleClick = () => {
        this.setState({ click: !this.state.click });
    };
    
    componentDidMount(){
            
    }

    render() {
        return (
        <div>
            <Navbar className="navbar fixed-top navbar-expand-lg navbar-dark p-md-3 " expand="lg">
            <NavbarBrand href='/'><img style={logoStyle} src={logo} alt=''/></NavbarBrand>
            
            <NavbarToggler onClick={this.toggle} className="mr-2">
                <div id="close-icon" className={!this.state.isOpen ? "" : "open"}>
                <span className='navbar-toggler-icon'></span>
                </div>
            </NavbarToggler>
            <Collapse isOpen={!this.state.isOpen} navbar>
                <Nav className="mr-auto sitebar" navbar> 

                {this.props.token && this.props.isCounselor ? (
                    <>
                    <NavItem>
                        <NavLink to="/user" onClick={this.toggle}>
                        <Link to="/user" className='nav-link text-white nav-item' >Profile</Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/counselor" onClick={this.toggle}>
                        <Link to="/counselor" className='nav-link text-white nav-item' >Counselor</Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/chapter" onClick={this.toggle}>
                        <Link to="/chapter" className='nav-link text-white nav-item'>Chapter</Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/" onClick={this.props.clickLogout}>
                        <Link to="/" className='nav-link text-white nav-item' onClick={this.toggle}>Log Out</Link>
                        </NavLink>
                    </NavItem>
                    </>
                ) : this.props.token && !this.props.isCounselor ?
                (
                    <>
                    <NavItem>
                        <NavLink to="/user" onClick={this.toggle}>
                        <Link to="/user" className='nav-link text-white nav-item' >Profile</Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/" onClick={this.props.clickLogout}>
                        <Link to="/" className='nav-link text-white nav-item' onClick={this.toggle}>Log Out</Link>
                        </NavLink>
                    </NavItem>
                    </>
                )
                :
                (
                    <>
                    <NavItem>
                    <NavLink to="/findchapter" onClick={this.toggle}>
                    <Link to="/findchapter" className='nav-link text-white nav-item'>Find Support</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/portal" onClick={this.toggle}>
                    <Link to="/portal" className='nav-link text-white nav-item'>Log In</Link>
                    </NavLink>
                </NavItem>
                    </>
                )}
                </Nav>
            </Collapse>
            </Navbar>
        </div>
        );
    }
}
export default Sitebar;
