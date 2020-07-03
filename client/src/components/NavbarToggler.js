import React, { useState } from "react";
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
} from "reactstrap";
import { Link } from "react-router-dom";
import melogo from "../images/melogo.png";
import SignUp from "./SignUp";
import Login from "./Login";
import Signout from "./Signout";

const RSNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const signOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    window.location = "/";
  };

  const defaultLoginButtons = (
    <>
      <Link to="sign-up">
        <SignUp />
      </Link>
      <Link to="/login">
        <Login />
      </Link>
    </>
  );

  const userButtons = <Button onClick={signOut}>Sign Out</Button>;

  const myWatchListNav = (
    <>
      <NavItem>
        <Link to="/my-watchlist" style={{ textDecoration: "none" }}>
          <NavLink>My Watchlist</NavLink>
        </Link>
      </NavItem>
    </>
  );

  return (
    <div>
      <Navbar light expand="md" className="bg-dark">
        <Link to="/">
          <img src={melogo} width="32px" className="mr-2" alt="logo"></img>
        </Link>
        <Link to="/">
          <NavbarBrand href="https://www.marketexamine.com/">
            MarketExamine
          </NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/markets" style={{ textDecoration: "none" }}>
                <NavLink>Markets</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/news" style={{ textDecoration: "none" }}>
                <NavLink>News</NavLink>
              </Link>
            </NavItem>
            {localStorage.usertoken ? myWatchListNav : null}
            <NavItem>
              <Link to="/tools" style={{ textDecoration: "none" }}>
                <NavLink>Tools</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/crypto" style={{ textDecoration: "none" }}>
                <NavLink>Crypto</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <NavLink>Contact</NavLink>
              </Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar></UncontrolledDropdown>
          </Nav>
          {localStorage.usertoken ? userButtons : defaultLoginButtons}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default RSNav;
