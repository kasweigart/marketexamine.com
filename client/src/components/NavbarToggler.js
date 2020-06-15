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
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom'
import melogo from '../images/melogo.png'

const RSNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  function SubmitHandler() {
    return (
      <Redirect to='/search' />
    )
  }

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
            <Form inline onSubmit={SubmitHandler()} className='ml-3'>
      <FormGroup>
        <Label for="search"></Label>
        <Input type="text" name="text" id="search" placeholder="Enter ticker..." />
      </FormGroup>
    </Form>
          </Nav>
    <Link to='/login'style={{textDecoration: 'none'}}> 
      <Button color='light'>
            Login
            </Button>
            </Link>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default RSNav;