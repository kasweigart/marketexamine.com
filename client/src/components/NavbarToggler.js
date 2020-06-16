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

const RSNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle2 = () => setModal(!modal);

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
      <Button color='light' onClick={toggle2}>
            Login
            </Button>
            <Modal isOpen={modal} toggle={toggle2} className={className}>
        <ModalHeader toggle={toggle2}>Login</ModalHeader>
        <ModalBody>
        <Form>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" placeholder="" />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="text" name="password" id="password" placeholder="" />
      </FormGroup>
      </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={toggle2}>Sign Up</Button>
          <Button color="secondary" onClick={toggle2}>Login</Button>
          <Button color="danger" onClick={toggle2}>Cancel</Button>
        </ModalFooter>
      </Modal>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default RSNav;