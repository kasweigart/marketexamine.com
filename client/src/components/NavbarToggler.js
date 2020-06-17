import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { Link } from 'react-router-dom'
import melogo from '../images/melogo.png'
import SignUp from './SignUp'
import Login from './Login'

const RSNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md" className='bg-dark'>
      <Link to='/'>
        <img src={melogo} width="32px" className="mr-2"></img>
        </Link>
        <Link to='/'>
        <NavbarBrand href="https://www.marketexamine.com/">MarketExamine</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/markets" style={{textDecoration: 'none'}}>
              <NavLink>Markets</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to='/news' style={{textDecoration: 'none'}}>
              <NavLink>News</NavLink>
              </Link>
            </NavItem>
            <NavItem>
            <Link to='/my-watchlist' style={{textDecoration: 'none'}}>
              <NavLink>My Watchlist</NavLink>
              </Link>
            </NavItem>
            <NavItem>
                <Link to='/tools' style={{textDecoration: 'none'}}>
              <NavLink>Tools</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to ='/crypto' style={{textDecoration: 'none'}}>
              <NavLink>Crypto</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to='/contact' style={{textDecoration: 'none'}}>
              <NavLink>Contact</NavLink>
              </Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
            </UncontrolledDropdown>
          </Nav>
          <Link to='/sign-up'>
          <SignUp />
          </Link>
          <Link to='/login'>
          <Login />
          </Link>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default RSNav;