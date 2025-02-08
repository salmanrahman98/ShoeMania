import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Navi.css";
import React from "react";
import {
  BsFillCartCheckFill,
  BsFillBookmarkHeartFill,
  BsHouseFill,
  BsFillPersonFill,
} from "react-icons/bs";

const Navi = () => {
  return (
    <div className="">
      <Navbar className="bg-light" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand>
            {" "}
            <p className="title">ShoeMania❞</p>{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" style={{}} navbarScroll>
              <NavLink className="navItems" to={"/allProducts"}>
                {" "}
                <div>
                  <BsHouseFill />
                </div>{" "}
                Home{" "}
              </NavLink>
              <NavLink className="navItems" to={"/user/checkout"}>
                {" "}
                <div>
                  <BsFillCartCheckFill />
                </div>
                Cart
              </NavLink>
              <NavLink className="navItems" to={"/profile"}>
                {" "}
                <div>
                  <BsFillPersonFill />
                </div>
                Account
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navi;
