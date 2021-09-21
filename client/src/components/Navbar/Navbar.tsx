import React, {Component, useState} from 'react'
import { Link } from 'react-router-dom'
import { MdFingerprint } from 'react-icons/md'
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from '../../assets/logo.png'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button,
    NavLink
} from 'reactstrap'
import { link } from 'fs'

const logoStyle = {
    width: '64px',
}

type SitebarProps = {
    clickLogout: () => void
    token: string
}

type SitebarState = {
    isOpen: boolean,
    click: boolean
}


class Sitebar extends Component <SitebarProps, SitebarState> {
    constructor(props: SitebarProps) {
        super(props)
        this.state = {
            isOpen: false,
            click: false
        }
        this.toggle = this.toggle.bind(this)
        // this.handleClick = this.handleClick(this)
    }
    toggle () {
        this.setState({ isOpen: !this.state.isOpen })
    }

    handleClick = () => {
        this.setState({click: !this.state.click})
    }

    // handleLogout = () => {

    // }

    render(){
        return(
            <>
            <Navbar className='sitebar' expand='md'>
            <img style={logoStyle} src={logo}/>
            <NavbarBrand href='/' className='mr-auto sitebar'>Lactation Navigation</NavbarBrand>
            <NavbarToggler onClick={this.toggle} className='mr-2'>
            <div id="close-icon" className={this.state.isOpen ? "open" : "" }>
            <span></span>
            <span></span>
            <span></span>
            </div>
            </NavbarToggler>
            <Collapse isOpen={!this.state.isOpen} navbar>
            <Nav className="mr-auto sitebar" navbar>
            <NavItem>
            <NavLink onClick={this.toggle}>
            <Link to='/' className="navbar-logo sitebar">Home</Link></NavLink>
            </NavItem>
            <NavItem>
            <NavLink to="/portal" onClick={this.toggle}><Link to='/portal'>Sign Up</Link></NavLink>
            </NavItem>
            {this.props.token ? (
            <>
            <NavItem>
            <NavLink to="/portal" onClick={this.toggle}><Link to='/user'>Profile</Link></NavLink>
            </NavItem>
            <NavItem>
            <NavLink to="/portal" onClick={this.toggle}><Link to='/chapter'>Chapter</Link></NavLink>
            </NavItem>
            <NavItem>
            <NavLink to='/counselor' onClick={this.toggle}><Link to='/counselor'>Counselor</Link></NavLink>
            </NavItem>
            <NavItem>
            <NavLink to='/' onClick={this.props.clickLogout}><Link to='/'>Counselor</Link></NavLink>
            </NavItem>
              
            </>
          ) : (
            <></>
          )}
            </Nav>
            </Collapse>
        </Navbar>
            </>
        )
    }
}
    export default Sitebar
  
        // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

        // <div className="container-fluid">
        // <img style={logoStyle} src={logo}/>
        //     <a className="navbar-brand" href="#">Lactation Navigation</a>
        //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //     <span className="navbar-toggler-icon"></span>
        //     </button>
        //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //         <li className="nav-item">
        //         <a className="nav-link active" aria-current="page" href="#">Home</a>
        //         </li>
        //         <li className="nav-item">
        //         <a className="nav-link" href="#">Link</a>
        //         </li>
        //     </ul>
            
        //     </div>
        // </div>
        // </nav>