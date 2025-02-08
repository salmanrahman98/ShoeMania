import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { FcTodoList } from "react-icons/fc";
import {
  BsFillPersonFill,
} from "react-icons/bs";

const AdminNavi = () => {
  return (
    <div className="">
      <Navbar className="bg-light" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand>
            {" "}
            <p className="title">Admin ShoeMania❞</p>{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" style={{}} navbarScroll>
              <NavDropdown className="navItems" title="Actions">
                <NavDropdown.Item>
                  <Link to={"/additems"}>Add Product</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to={"/listallproduct"}>List products</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavLink className="navItems" to={"/adminprofile"}>
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

export default AdminNavi;
